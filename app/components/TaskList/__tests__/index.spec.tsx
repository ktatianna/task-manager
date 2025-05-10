import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";
import TaskList from "../index";
import { useTaskStore } from "@/app/store/useTaskStore";

jest.mock("@/app/store/useTaskStore", () => ({
  useTaskStore: jest.fn(),
}));

const defaultTasks = [
  { id: "1", description: "Leer un libro", completed: false },
  { id: "2", description: "Hacer ejercicio", completed: true },
];

const setup = (tasksOverride = defaultTasks, clearCompletedMock = jest.fn()) => {
  (useTaskStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({ tasks: tasksOverride, clearCompleted: clearCompletedMock })
  );
  return render(<TaskList />);
};

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match the snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should render all tasks", () => {
    setup();

    expect(screen.getByText("Leer un libro")).toBeInTheDocument();
    expect(screen.getByText("Hacer ejercicio")).toBeInTheDocument();
  });

  it("should render empty message if there are no tasks", () => {
    setup([]);
    expect(screen.getByText("You have no tasks yet")).toBeInTheDocument();
  });

  it("should call clearCompleted when the button is clicked", async () => {
    const clearCompletedMock = jest.fn();
    setup(defaultTasks, clearCompletedMock);

    const button = screen.getByRole("button", { name: "Delete completed tasks" });
    await userEvent.click(button);
    expect(clearCompletedMock).toHaveBeenCalled();
  });
});
