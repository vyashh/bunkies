import {
  IonButton,
  IonButtons,
  IonContent,
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
import { CirclePicker } from "react-color";
import "./admin-task-edit.styles.scss";
import Bin from "../../assets/icons/bin.svg";

interface Props {
  addTaskToHouse: () => void;
  handleColorChange: () => void;
  setCreateTask: (state: boolean) => void;
  setTitle: (value: string) => void;
  setMembers: (value: string) => void;
  setPenalty: (value: string) => void;
  addTask: () => void;
  deleteTask: (index: number) => void;
  isOpen: boolean;
  color: any;
  members: any;
  house: any;
  penalty: any;
  todoList: any;
}

const AdminTaskEdit: React.FC<Props> = (props) => {
  return (
    <IonModal isOpen={props.isOpen}>
      <div className="admin-task__create">
        <IonContent fullscreen>
          <IonList lines="full" class="ion-no-margin">
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton
                  style={{ backgroundColor: "transparent" }}
                  onClick={props.addTaskToHouse}
                >
                  Save
                </IonButton>
              </IonButtons>
              <IonButtons slot="start">
                <IonButton
                  style={{ backgroundColor: "transparent" }}
                  onClick={() => props.setCreateTask(false)}
                >
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Create Task</IonTitle>
            </IonToolbar>
            <IonList>
              <IonItem>
                <IonLabel>Title</IonLabel>
                <IonInput
                  placeholder="Clean Bathroom"
                  onKeyUp={(e: any) => props.setTitle(e.target.value)}
                />
              </IonItem>

              <IonItem>
                <IonLabel>Color</IonLabel>
                <br />
                <CirclePicker
                  color={props.color}
                  onChangeComplete={props.handleColorChange}
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
                  value={props.members}
                  multiple={true}
                  cancelText="Cancel"
                  okText="Assign"
                  style={{ width: "100%" }}
                  onIonChange={(e) => props.setMembers(e.detail.value)}
                >
                  {props.house &&
                    props.house.members.map((member: any) => {
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
                  value={props.penalty}
                  cancelText="Cancel"
                  okText="Assign"
                  onIonChange={(e) => props.setPenalty(e.detail.value)}
                  style={{ width: "100%" }}
                >
                  <IonSelectOption value="none">None</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonListHeader>Todo</IonListHeader>
              <IonItem>
                <IonInput
                  onKeyPress={props.addTask}
                  placeholder="Add to todo list"
                />
              </IonItem>

              {props.todoList &&
                props.todoList.map((task: any, index: number) => {
                  console.log(task);
                  return (
                    <IonItem key={index}>
                      <IonIcon
                        slot="end"
                        size="small"
                        icon={Bin}
                        onClick={() => props.deleteTask(index)}
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
  );
};

export default AdminTaskEdit;
