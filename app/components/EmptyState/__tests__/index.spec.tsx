import { render } from "@testing-library/react";
import EmptyState from "../index";

describe("EmptyState", () => {
  it("should match the snapshot", () => {
    const { container } = render(<EmptyState />);
    expect(container).toMatchSnapshot();
  });
});
