import React from "react";
import { render, screen } from "@testing-library/react";
import HackerRankTests from "../../boxes/HackerRankTests/HackerRankTests";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Testing hacker rank tests page", () => {
  it("Page renders successfully", () => {
    render(
      <Router>
        <HackerRankTests />
      </Router>
    );

    expect(screen.getByText("Notice")).toBeInTheDocument();
    expect(
      screen.getByText("This page is still under construction.")
    ).toBeInTheDocument();
    expect(screen.getByText("Go to homepage")).toBeInTheDocument();
  });
  it("Click on link to go to homepage", () => {
    render(
      <Router>
        <HackerRankTests />
      </Router>
    );
    expect(screen.getByText("Go to homepage")).toBeInTheDocument();
    userEvent.click(screen.getByText("Go to homepage"));
    expect(window.location.pathname).toBe("/");
  });
});
