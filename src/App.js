import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreProcText from './components/PreProcText';
import VolumeSlider from './components/VolumeSlider';
import BPMSelector from './components/BPMSelector'

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

//export function SetupButtons() {

//    //document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//    //document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//    //document.getElementById('process').addEventListener('click', () => {
//    //    Proc()
//    //}
//    //)
//    //document.getElementById('process_play').addEventListener('click', () => {
//    //    if (globalEditor != null) {
//    //        Proc()
//    //        globalEditor.evaluate()
//    //    }
//    //}
//    //)
//}



//export function ProcAndPlay() {
//    //if (globalEditor != null && globalEditor.repl.state.started == true) {
//    //    console.log(globalEditor)
//    //    Proc()
//    //    globalEditor.evaluate();
//    //}
//}

//export function Proc() {

//    //let proc_text = document.getElementById('proc').value
//    //let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//    //ProcessText(proc_text);
//    //globalEditor.setCode(proc_text_replaced)
//}

//export function ProcessText(match, ...args) {

//    let replace = ""
//    //if (document.getElementById('flexRadioDefault2').checked) {
//    //    replace = "_"
//    //}

//    return replace
//}

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const handleProc = () => {
        let processed = songText;
        setSongText(processed)
        

    }

    const handleProcAndPlay = () => {
        let processed = songText;
        setSongText(processed)
        globalEditor.evaluate()
    }

    const [songText, setSongText] = useState(stranger_tune)

    const [instruments, setInstruments] = useState([]);
    function extractInstruments(songText) {
        //finds line that have "something" + ":"
        const regex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;
        const instruments = [];
        let match;

        while ((match = regex.exec(songText)) !== null) {
            instruments.push(match[1]);
        }
        console.log("detected instruments:", instruments);
        return instruments;
    }

    useEffect(() => {
        const detected = extractInstruments(songText);
        setInstruments(detected);
    }, [songText]);

    //gain pattern
    const [gainPattern, setGainPattern] = useState(0);

    const handleGainPatternChange = (newPattern) => {
        setGainPattern(newPattern);
        
        const processed = songText.replace(
            /const\s+pattern\s*=\s*\d+/,
            `const pattern = ${newPattern}`
        );

        setSongText(processed);

        if (globalEditor && globalEditor.repl?.state?.started) {
            globalEditor.setCode(processed);
            globalEditor.evaluate();
        }
        ;
    };

    //volume
    const [volume, setVolume] = useState(1);


    const handleVolumeChange = (newVol) => {
        setVolume(newVol);

        let processed = songText;        
        
        //add volume multiplier to existing any existing .gain()
        processed = processed.replace(
            /\.gain\(([^)]+)\)/g,
            (_, inner) => `.gain((${inner}) * ${newVol})`
        );
        //if .gain() not existing add new gain and multiply by newVol
        //regex finds all s(...) or note(...) to find all instruments
        //searches for .gain() until a newline or comma
        //excludes samples(...) or setcps(...)
        processed = processed.replace(
            /(?<!samples|setcps)(?:\b(?:s|note)\([^)]*\))(?![^,]*\.gain\()/g,
            (match) => {
                // continue if .gain( is existing
                if (!/\.gain\(/.test(match)) {
                    // find the index of the period after s(...) or note(...)
                    const dotIndex = match.indexOf('.', match.indexOf(')'));
                    // search for 
                    if (dotIndex !== -1) {
                        return (
                            match.slice(0, dotIndex) + `.gain(1 * ${newVol})` + match.slice(dotIndex)
                        );
                    } else {
                        // no period found, just append gain at the end
                        return match + `.gain(1 * ${newVol})`;
                    }
                }
                return match;
            }
        );
        
        
        // reprocess and play immediately if runnning
        if (globalEditor != null && globalEditor.repl.state.started == true) {
            globalEditor.setCode(processed);
            globalEditor.evaluate();
        }
        
    };

    const [bpm, setBpm] = useState(120);
    const handleBpmChange = (newBpm) => {
        setBpm(newBpm);

        
        const cps = newBpm/ 240; //convert bpm to cps

        
        let processed;
        if (/setcps\([^)]+\)/g.test(songText)) {
            // replace existing setcps()
            processed = songText.replace(
                /setcps\([^)]+\)/g,
                `setcps(${cps})`
            );
        } else {
            // add if missing
            processed = `setcps(${cps})\n` + songText;
        }

        setSongText(processed);
        if (globalEditor) {
            globalEditor.setCode(processed);
            globalEditor.evaluate();
        }
    };

    const handleInstrumentToggle = (instrumentName, isChecked) => {
        let processed = songText;

        if (isChecked) {
            // Restore the instrument name (remove underscore)
            const regex = new RegExp(`_${instrumentName}\\s*:`, "g");
            processed = processed.replace(regex, `${instrumentName}:`);
        } else {
            // Disable it by adding an underscore prefix
            const regex = new RegExp(`(?<!_)\\b${instrumentName}\\s*:`, "g");
            processed = processed.replace(regex, `_${instrumentName}:`);
        }

        setSongText(processed);

        if (globalEditor && globalEditor.repl?.state?.started) {
            globalEditor.setCode(processed);
            globalEditor.evaluate();
        }
    };

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
        //SetupButtons()
        //Proc()
    }
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    
                    <div className="col-md-6" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div className="border border-secondary p-3">
                            <PreProcText defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        
                        <nav className="d-flex justify-content-center">
                            <div className="row border border-secondary rounded p-2 align-items-center justify-content-between " style={{ maxWidth: "95%" }}>
                                {/*<ProcButtons onProc={handleProc} onProcAndPlay={handleProcAndPlay} /> */}
                                <div className="col-auto">
                                    <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                                </div>
                                
                                
                                <div className="col-md-6">
                                    <VolumeSlider volume={volume} onVolumeChange={handleVolumeChange} />
                                </div>
                                <div className="col-md-3">
                                    <BPMSelector bpm={bpm} onBpmChange={ handleBpmChange }/>
                                </div>
                            </div>


                        </nav>
                        <div className="m-4">
                            <DJControls gainPattern={gainPattern} onGainPatternChange={handleGainPatternChange} onInstrumentToggle={handleInstrumentToggle} />
                        </div>
                        
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                        
                        
                    </div>
                    <div className="col-md-6">
                        <div className="row mb-3 align-items-center">

                            <div className="col-md-3">

                            </div>


                            <div className="col-md-9">


                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}