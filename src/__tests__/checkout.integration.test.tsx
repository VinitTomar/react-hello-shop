import { screen, waitFor } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { axe } from "vitest-axe";
import App from "@/App";
import { MOCK_PRODUCTS } from "@/data/products";
import { server } from "@/mocks/server";
import { useCartStore } from "@/store/cartStore";
import { renderWithProviders } from "@/test/utils";

const SHIPPING = {
  fullName: "Alex Johnson",
  address: "123 Main St",
  city: "Portland",
  country: "US",
  postalCode: "97201",
};

const PAYMENT = {
  cardNumber: "4111111111111111",
  expiry: "12/26",
  cvv: "123",
};

beforeEach(() => {
  useCartStore.setState({
    items: [{ product: MOCK_PRODUCTS[0], quantity: 1 }],
  });
});

async function fillShipping(user: UserEvent) {
  await user.type(screen.getByLabelText("Full Name"), SHIPPING.fullName);
  await user.type(screen.getByLabelText("Address"), SHIPPING.address);
  await user.type(screen.getByLabelText("City"), SHIPPING.city);
  await user.type(screen.getByLabelText("Country"), SHIPPING.country);
  await user.type(screen.getByLabelText("Postal Code"), SHIPPING.postalCode);
  await user.click(screen.getByRole("button", { name: "Continue to Payment" }));
}

async function fillPayment(user: UserEvent) {
  await user.type(screen.getByLabelText("Card Number"), PAYMENT.cardNumber);
  await user.type(screen.getByLabelText("Expiry"), PAYMENT.expiry);
  await user.type(screen.getByLabelText("CVV"), PAYMENT.cvv);
  await user.click(screen.getByRole("button", { name: "Place Order" }));
}

describe("Checkout flow", () => {
  it("completes the happy path: shipping → payment → confirmation", async () => {
    const { user } = renderWithProviders(<App />, { route: "/checkout" });

    await screen.findByRole("button", { name: "Continue to Payment" });
    await fillShipping(user);
    await screen.findByRole("button", { name: "Place Order" });
    await fillPayment(user);

    expect(await screen.findByText("ORD-TEST-001")).toBeInTheDocument();
  });

  it("shows all five shipping errors when the form is submitted empty", async () => {
    const { user } = renderWithProviders(<App />, { route: "/checkout" });

    await screen.findByRole("button", { name: "Continue to Payment" });
    await user.click(
      screen.getByRole("button", { name: "Continue to Payment" }),
    );

    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument();
      expect(screen.getByText("Address is required")).toBeInTheDocument();
      expect(screen.getByText("City is required")).toBeInTheDocument();
      expect(screen.getByText("Country is required")).toBeInTheDocument();
      expect(screen.getByText("Invalid postal code")).toBeInTheDocument();
    });
  });

  it("shows a postal code format error on blur", async () => {
    const { user } = renderWithProviders(<App />, { route: "/checkout" });

    await screen.findByRole("button", { name: "Continue to Payment" });
    await user.type(screen.getByLabelText("Postal Code"), "abc");
    await user.tab();

    expect(await screen.findByText("Invalid postal code")).toBeInTheDocument();
  });

  it("shows payment errors when the payment form is submitted empty", async () => {
    const { user } = renderWithProviders(<App />, { route: "/checkout" });

    await screen.findByRole("button", { name: "Continue to Payment" });
    await fillShipping(user);

    await screen.findByRole("button", { name: "Place Order" });
    await user.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(
        screen.getByText("Enter a 16-digit card number"),
      ).toBeInTheDocument();
      expect(screen.getByText("Use MM/YY format")).toBeInTheDocument();
      expect(screen.getByText("Invalid CVV")).toBeInTheDocument();
    });
  });

  it("shows a card number format error on blur", async () => {
    const { user } = renderWithProviders(<App />, { route: "/checkout" });

    await screen.findByRole("button", { name: "Continue to Payment" });
    await fillShipping(user);

    await screen.findByRole("button", { name: "Place Order" });
    await user.type(screen.getByLabelText("Card Number"), "1234");
    await user.tab();

    expect(
      await screen.findByText("Enter a 16-digit card number"),
    ).toBeInTheDocument();
  });

  it("shows an error banner when the checkout API returns 500", async () => {
    server.use(
      http.post("/api/checkout", () =>
        HttpResponse.json({ error: "Server error" }, { status: 500 }),
      ),
    );
    const { user } = renderWithProviders(<App />, { route: "/checkout" });

    await screen.findByRole("button", { name: "Continue to Payment" });
    await fillShipping(user);

    await screen.findByRole("button", { name: "Place Order" });
    await fillPayment(user);

    expect(
      await screen.findByText("Something went wrong. Please try again."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Place Order" })).toBeEnabled();
  });

  it("redirects to /cart when the cart is empty", async () => {
    useCartStore.setState({ items: [] });
    renderWithProviders(<App />, { route: "/checkout" });

    expect(await screen.findByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Full Name")).not.toBeInTheDocument();
  });
});

describe("Checkout accessibility", () => {
  it("shipping step has no axe violations", async () => {
    const { container } = renderWithProviders(<App />, { route: "/checkout" });
    await screen.findByRole("button", { name: "Continue to Payment" });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("payment step has no axe violations", async () => {
    const { user, container } = renderWithProviders(<App />, {
      route: "/checkout",
    });
    await screen.findByRole("button", { name: "Continue to Payment" });
    await fillShipping(user);
    await screen.findByRole("button", { name: "Place Order" });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("confirmation step has no axe violations", async () => {
    const { user, container } = renderWithProviders(<App />, {
      route: "/checkout",
    });
    await screen.findByRole("button", { name: "Continue to Payment" });
    await fillShipping(user);
    await screen.findByRole("button", { name: "Place Order" });
    await fillPayment(user);
    await screen.findByText("ORD-TEST-001");

    expect(await axe(container)).toHaveNoViolations();
  });
});
