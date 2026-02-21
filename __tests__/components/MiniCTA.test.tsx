import React from "react";
import { render, screen } from "@testing-library/react";
import MiniCTA from "@/components/MiniCTA";

describe("MiniCTA", () => {
  it("renders without crashing", () => {
    render(<MiniCTA />);
    expect(screen.getByText("Have Questions?")).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<MiniCTA />);
    expect(
      screen.getByText(/Reach out to our team or browse common questions/)
    ).toBeInTheDocument();
  });

  it("renders Contact Support button linking to /support", () => {
    render(<MiniCTA />);
    const link = screen.getByRole("link", { name: /Contact Support/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/support");
  });

  it("renders Browse FAQ button linking to /faq", () => {
    render(<MiniCTA />);
    const link = screen.getByRole("link", { name: /Browse FAQ/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/faq");
  });

  it("has a section wrapper with bg-componentpage", () => {
    const { container } = render(<MiniCTA />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section?.className).toContain("bg-componentpage");
  });
});
