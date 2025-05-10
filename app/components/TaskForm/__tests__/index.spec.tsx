import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { useTaskStore } from "@/app/store/useTaskStore";
import TaskForm from "../index";

jest.mock("@/app/store/useTaskStore", () => ({
  useTaskStore: jest.fn(),
}));

const setup = (propsOverride = {}) => {
  const props = { ...propsOverride };

  return {
    ...render(<TaskForm {...props} />),
    props,
  };
};

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match the snapshot", () => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue(() => {});
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should update the input value when typing", async () => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue(() => {});
    setup();
    const input = screen.getByPlaceholderText("Add a new task") as HTMLInputElement;
    await userEvent.type(input, "Nueva tarea");
    expect(input.value).toBe("Nueva tarea");
  });

  it("should call addTask and clear input when submitting a non-empty value", async () => {
    const addTaskMock = jest.fn();
    (useTaskStore as unknown as jest.Mock).mockReturnValue(addTaskMock);

    setup();
    const input = screen.getByPlaceholderText("Add a new task") as HTMLInputElement;
    const AddButton = screen.getByRole("button", { name: "Add" });

    await userEvent.type(input, "Nueva tarea");
    await userEvent.click(AddButton);

    expect(addTaskMock).toHaveBeenCalledWith("Nueva tarea");
    expect(input.value).toBe("");
  });

  it("should not call addTask if input is empty", async () => {
    const addTaskMock = jest.fn();
    (useTaskStore as unknown as jest.Mock).mockReturnValue(addTaskMock);

    setup();
    const button = screen.getByRole("button", { name: "Add" });

    await userEvent.click(button);

    expect(addTaskMock).not.toHaveBeenCalled();
  });
});