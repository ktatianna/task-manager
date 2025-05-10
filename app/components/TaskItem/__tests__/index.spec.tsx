import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskItem from "../index";
import { useTaskStore } from "@/app/store/useTaskStore";

jest.mock("@/app/store/useTaskStore", () => ({
  useTaskStore: jest.fn(),
}));

const defaultTask = {
  id: "1",
  description: "Leer un libro",
  completed: false,
};

const setup = (propsOverride = {}) => {
  const props = {
    task: defaultTask,
    ...propsOverride,
  };
  return {
    ...render(<TaskItem {...props} />),
    props,
  };
};

describe("TaskItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match the snapshot", () => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue(() => {});
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should render the task description", () => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue(() => {});
    setup();

    const description = screen.getByText(defaultTask.description);
    expect(description).toBeInTheDocument();
  });

  it("should call toggleTask when checkbox is clicked", async () => {
    const toggleTaskMock = jest.fn();
    (useTaskStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        toggleTask: toggleTaskMock,
        deleteTask: jest.fn(),
      })
    )

    setup();
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(toggleTaskMock).toHaveBeenCalledWith(defaultTask.id);
  });

  it("should call deleteTask when delete button is clicked", async () => {
    const deleteTaskMock = jest.fn();
    (useTaskStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        toggleTask: jest.fn(),
        deleteTask: deleteTaskMock,
      })
    );

    setup();
    const deleteButton = screen.getByRole("button", { name: /delete task/i });
    await userEvent.click(deleteButton);

    expect(deleteTaskMock).toHaveBeenCalledWith(defaultTask.id);
  });
});
