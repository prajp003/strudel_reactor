import { useState } from 'react'
function DJControls({gainPattern, onGainPatternChange}) {
    
    
    return (
        <div id="djcontrols" className="container-fluid">

            


            <div className="row mb-3">

                <div className="col-md-6">
                    <h6 className="section-label">Instruments</h6>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="arp1" />
                        <label className="form-check-label" htmlFor="arp1">
                            Main Arp
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="d1" />
                        <label className="form-check-label" htmlFor="d1">
                            Drum 1
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="d2" />
                        <label className="form-check-label" htmlFor="d2">
                            Drum 2
                        </label>
                    </div>
                </div>


                <div className="col-md-6">
                    <h6 className="section-label">Gain Patterns</h6>

                    <div className="form-check">
                        <input
                            className="form-check-input" type="radio" name="radioDefault" id="gainPattern1" onChange={() => onGainPatternChange(0)}
                        />
                        <label className="form-check-label" htmlFor="gainPattern1">
                            Gain Pattern 1
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input" type="radio" name="radioDefault" id="gainPattern2" onChange={() => onGainPatternChange(1)}
                        />
                        <label className="form-check-label" htmlFor="gainPattern2">
                            Gain Pattern 2
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input" type="radio" name="radioDefault" id="gainPattern3" onChange={() => onGainPatternChange(2)}
                        />
                        <label className="form-check-label" htmlFor="gainPattern3">
                            Gain Pattern 3
                        </label>
                    </div>
                </div>
            </div>


            <div className="row mt-3">
                <div className="col text-center">
                    <input
                        type="checkbox" className="btn-check" id="showPreProcText" autoComplete="off"
                    />
                    <label className="btn btn-primary" htmlFor="showPreProcText">
                        Show Preprocess Text Area
                    </label>
                </div>
            </div>
        </div>

        

    );
}

export default DJControls;