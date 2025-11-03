function ProcButtons({ onProc, onProcAndPlay }) {
  return (
      <>
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
              <button id="process" className="btn btn-outline-primary" onClick={onProc}>Preprocess</button>
              <button id="process_play" className="btn btn-outline-primary" onClick={onProcAndPlay}>Proc & Play</button>
          </div>
      </>
  );
}

export default ProcButtons;