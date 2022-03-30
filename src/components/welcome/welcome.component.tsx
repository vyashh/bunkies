import { IonSlide, IonSlides } from "@ionic/react";
import { useContext, useRef, useState } from "react";
import { useAuth } from "../../services/firebase";
import { createHouse } from "../../services/house";
import { Context } from "../../services/store";
import Button from "../button/button.component";
import Input from "../input/input.component";
import JoinHouseImage from "../../assets/join_house.svg";
import CreateHouseImage from "../../assets/create_house.svg";
import "./welcome.styles.scss";

const Welcome: React.FC = () => {
  const { loadingIndicator, showIntroduction } = useContext(Context);
  const [loading, setLoading] = loadingIndicator;
  const [userHasNoHouse, setUserHasNoHouse] = showIntroduction;
  const currentUser = useAuth();
  const sliderRef = useRef<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [houseCode, setHouseCode] = useState<string>("");
  const [houseName, setHouseName] = useState<string>("");
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const handleSliderActions = async (action: string) => {
    const swiper = await sliderRef.current.getSwiper();

    action === "next" && swiper.slideNext();
    action === "join" && swiper.slideTo(2) && setIsCreate(false);
    action === "create" && swiper.slideTo(3) && setIsCreate(true);
  };

  // create user profile and house profile.
  const handleSubmit = (action: string) => {
    setLoading(true);
    if (action === "create") {
      createHouse(houseName, {
        displayName: userName,
        uid: currentUser?.uid,
      }).then(setUserHasNoHouse(false));

      setLoading(false);
    }
  };

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    // allowTouchMove: false,
  };

  return (
    <div className="welcome">
      <div className="welcome__slides">
        <IonSlides options={slideOpts} ref={sliderRef}>
          <IonSlide>
            <div className="welcome__slides--name">
              <h1>Welcome! </h1>
              <Input
                center
                type="text"
                placeholder="First name"
                setValue={setUserName}
              />
              <p className="welcome__slides__comments">
                This way your bunkies know who you are.
              </p>
              {userName && (
                <Button
                  text="Continue"
                  submit={() => handleSliderActions("next")}
                />
              )}
            </div>
          </IonSlide>
          <IonSlide>
            <div className="welcome__slides--house">
              <h1>I want to: </h1>
              <div className="welcome__slides--house--join">
                <img
                  src={JoinHouseImage}
                  alt="join a house"
                  onClick={() => handleSliderActions("join")}
                />
                <p>Join a house</p>
              </div>
              <hr className="thick-line" />
              <div className="welcome__slides--house--create">
                <img
                  src={CreateHouseImage}
                  alt="create a house"
                  onClick={() => handleSliderActions("create")}
                />
                <p>Create a house</p>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div
              className={`welcome__slides--name ${isCreate && "disable-slide"}`}
            >
              <h1>Enter Code: </h1>
              <Input type="text" placeholder="483273" />
              <p className="welcome__slides__comments">
                You can retrieve the code from the house owner.
              </p>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="welcome__slides--name">
              <h1>Create house: </h1>
              <Input
                center
                type="text"
                placeholder="Enter house name"
                setValue={setHouseName}
              />
              <p className="welcome__slides__comments">
                Create a name with your bunkies!
              </p>
              {houseName && (
                <Button
                  text="I'm happy!"
                  submit={() => handleSubmit("create")}
                />
              )}
            </div>
          </IonSlide>
        </IonSlides>
      </div>
    </div>
  );
};

export default Welcome;
