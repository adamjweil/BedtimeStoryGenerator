import React, { useState } from "react";
import NameEditor from "./NameEditor";
import LocationEditor from "./LocationEditor";
import DescriptionEditor from "./DescriptionEditor";

const InitialForm = ({ user, setName, setLocation, setDescription, onSubmit }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 0 && (
        <NameEditor
          user={user}
          isEditingName={true}
          name={user.name}
          setName={setName}
          toggleEditName={nextStep}
        />
      )}
      {step === 1 && (
        <LocationEditor
          user={user}
          isEditingLocation={true}
          location={user.location}
          handleLocationChange={setLocation}
          toggleEditLocation={nextStep}
        />
      )}
      {step === 2 && (
        <DescriptionEditor
          user={user}
          isEditingDescription={true}
          description={user.description}
          handleDescriptionChange={setDescription}
          toggleEditDescription={nextStep}
        />
      )}
      {step === 3 && <button type="submit">Finish</button>}
    </form>
  );
};

export default InitialForm;
