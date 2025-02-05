import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    createColocation,
    recoverFromError,
    isResourceValid,
    isWithResourceValid,
    isScoreValid,
    state: {
      call: { response, resultMessage },
    },
  } = useTask();
  return (
    <TaskSimple
      title="Create colocation constraint"
      task={taskName}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            nextIf={isResourceValid && isWithResourceValid && isScoreValid}
            run={createColocation}
            runLabel="Create colocation constraint"
          />
        )
      }
    >
      {response === "" && <Configure />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle="Creating colocation constraint"
          successTitle="Colocation created successfully"
          failTitle="Create colocation constraint failed"
          tryAgain={createColocation}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
