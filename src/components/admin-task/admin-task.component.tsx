import "./admin-task.styles.scss";
import Add from "../../assets/icons/add.svg";
import Bin from "../../assets/icons/bin.svg";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useState } from "react";
import { Context } from "../../services/store";
import { addTask as addTaskToDB } from "../../services/house";
import { CirclePicker } from "react-color";
import NoData from "../../assets/empty.svg";

interface Props {
  create?: boolean;
}

const AdminTask: React.FC<Props> = ({ create }) => {
  const { houseData, tasksData, loadingIndicator } = useContext(Context);
  const [loading, setLoading] = loadingIndicator;
  const [tasks, setTasks] = tasksData;
  const [house, setHouse] = houseData;
  const [createTask, setCreateTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [todoList, setTodoList] = useState<Array<any>>([]);
  const [title, setTitle] = useState<string>("");
  const [members, setMembers] = useState<any[]>([]);
  const [penalty, setPenalty] = useState<any[]>([]);
  const [color, setColor] = useState<string>("");
  const [taskEdit, setTaskEdit] = useState<any>(null);

  const addTask = (e: any) => {
    if (e.key === "Enter") {
      const newTodoItem = e.target.value;
      setTodoList((todo) => [...todoList, { title: newTodoItem }]);
      e.target.value = "";
    }
  };

  const deleteTask = (item: number) => {
    const newTodoList = todoList.filter(
      (todoItem, index) => index !== todoItem
    );
    console.log(newTodoList);
    setTodoList(newTodoList);
  };

  const addTaskToHouse = () => {
    setLoading(true);
    addTaskToDB(house.id, title, color, todoList, members).then(() => {
      setCreateTask(false);
      setLoading(false);
    });
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  // const changeModeToEdit = (task?: any) => {
  //   setCreateTask(!createTask);
  //   setEditTask(!editTask);

  //   createTask && editTask ? setTaskEdit()
  // };

  console.log(taskEdit !== null);

  return (
    <div>
      {tasks ? (
        tasks.map((task: any) => {
          return (
            <div
              className="admin-task--task"
              style={{ backgroundColor: task.color }}
              onClick={() => setTaskEdit(task)}
            >
              <div className="admin-task--task__title">{task.title}</div>
              <div className="admin-task--task__assigned">User</div>
            </div>
          );
        })
      ) : (
        <div className="no-data">
          <div>
            <p>No Tasks. Create new task!</p>
          </div>
        </div>
      )}
      <IonFab horizontal="end" vertical="bottom" slot="fixed">
        <IonFabButton onClick={() => setCreateTask(true)}>
          <IonIcon icon={Add} />
        </IonFabButton>
      </IonFab>

      <IonModal isOpen={taskEdit !== null || createTask}>
        <div className="admin-task__create">
          <IonContent fullscreen>
            <IonList lines="full" class="ion-no-margin">
              <IonToolbar>
                <IonButtons slot="end">
                  <IonButton
                    style={{ backgroundColor: "transparent", color: "#54279F" }}
                    onClick={addTaskToHouse}
                    title="Save"
                  >
                    Save
                  </IonButton>
                </IonButtons>
                <IonButtons slot="start">
                  <IonButton
                    style={{ backgroundColor: "transparent", color: "#54279F" }}
                    onClick={() => {
                      setCreateTask(false);
                      setTaskEdit(null);
                    }}
                    title="Cancel"
                  >
                    Cancel
                  </IonButton>
                </IonButtons>
                <IonTitle style={{ textAlign: "center" }}>
                  {taskEdit ? "Edit Task" : "Create Task"}
                </IonTitle>
              </IonToolbar>
              <IonList>
                <IonItem>
                  <IonLabel>Title</IonLabel>
                  <IonInput
                    placeholder="Clean Bathroom"
                    value={taskEdit && taskEdit.title}
                    onKeyUp={(e: any) => setTitle(e.target.value)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel>Color</IonLabel>
                  <br />
                  <CirclePicker
                    color={taskEdit ? taskEdit.color : color}
                    onChangeComplete={handleColorChange}
                    colors={[
                      "#54279F",
                      "#B8178D",
                      "#AF133E",
                      "#00266F",
                      "#AC42FF",
                      "#FE29C5",
                      "#F13F70",
                      "#3062C2",
                      "#2E2E2E",
                    ]}
                  />
                </IonItem>

                <IonListHeader>Members</IonListHeader>
                <IonItem>
                  <IonSelect
                    value={members}
                    multiple={true}
                    cancelText="Cancel"
                    okText="Assign"
                    style={{ width: "100%" }}
                    onIonChange={(e) => setMembers(e.detail.value)}
                  >
                    {house &&
                      house.members.map((member: any) => {
                        return (
                          <IonSelectOption value={member}>
                            {member.displayName}
                          </IonSelectOption>
                        );
                      })}
                  </IonSelect>
                </IonItem>

                <IonListHeader>Penalty</IonListHeader>
                <IonItem>
                  <IonSelect
                    value={penalty}
                    cancelText="Cancel"
                    okText="Assign"
                    onIonChange={(e) => setPenalty(e.detail.value)}
                    style={{ width: "100%" }}
                  >
                    <IonSelectOption value="none">None</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonListHeader>Todo</IonListHeader>
                <IonItem>
                  <IonInput
                    onKeyPress={addTask}
                    placeholder="Add to todo list"
                  />
                </IonItem>

                {todoList &&
                  todoList.map((task, index) => {
                    console.log(task);
                    return (
                      <IonItem key={index}>
                        <IonIcon
                          slot="end"
                          size="small"
                          icon={Bin}
                          onClick={() => deleteTask(index)}
                        ></IonIcon>
                        <IonLabel>{task.title}</IonLabel>
                      </IonItem>
                    );
                  })}
              </IonList>
            </IonList>
          </IonContent>
        </div>
      </IonModal>
    </div>
  );
};

export default AdminTask;
