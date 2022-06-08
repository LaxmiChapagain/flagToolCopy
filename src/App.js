// import { Input } from 'antd';
import React, { useEffect } from 'react';
import './App.css';
import Customcheckbox from './components/FtTools';
import Customtextbox from './components/FtTools/textbox';
import { Flags_Actions, initialState, useFlagToolDispatch, useFlagToolState } from './reducers/flags.reducer';


export default function App() {

  const flagDispatch = useFlagToolDispatch()
  const flagState = useFlagToolState()

  const value = {
    showColorPercentage: (val) => {
      flagDispatch({ type: Flags_Actions.SET_SHOW_COLOR_PERCENTAGE, payload: val });
    },
    hasRugShare: (val) => {
      flagDispatch({ type: Flags_Actions.SET_HAS_RUG_SHARE, payload: val });
    },
    showSaveImage: (val) => {
      flagDispatch({ type: Flags_Actions.SET_SHOW_SAVE_IMAGE, payload: val });
    },
    fullPageThumb: (val) => {
      flagDispatch({ type: Flags_Actions.SET_FULL_PAGE_THUMB, payload: val });
    },
    allowCreateYourRugTemplate: (val) => {
      flagDispatch({ type: Flags_Actions.SET_ALLOW_CREATE_YOUR_RUG_TEMPLATE, payload: val })
    },
defaultZoom:(val)=>{
  
  flagDispatch({ type: Flags_Actions.SET_DEFAULT_ZOOM, payload: val })
},
    submitDispatch: (val, handleSubmit) => {
      handleSubmit();
      flagDispatch({ type: Flags_Actions.SET_SUBMITTED, payload: val })
    },

    state: flagState
  }

  function handleSubmit() {
    let flags = {
      showColorPercentage: flagState.flags.showColorPercentage,
      hasRugshare: flagState.flags.hasRugShare,
      showSaveImage: flagState.flags.showSaveImage,
      fullPageThumb: flagState.flags.fullPageThumb,
      allowCreateYourRugTemplate: flagState.flags.allowCreateYourRugTemplate,
    }

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flagState.flags));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "flags.json");
    dlAnchorElem.click();
  }

  useEffect(() => {
    flagDispatch({ type: Flags_Actions.SET_SUBMITTED, payload: false })
  }, [flagState.flags.showColorPercentage, flagState.flags.hasRugShare, flagState.flags.showSaveImage, flagState.flags.fullPageThumb, flagState.flags.allowCreateYourRugTemplate])



  return (
    <>
      <div className="App">
        <h1> Flags Tool</h1>
      </div>

      <Customcheckbox name="colorPercentage" checked={flagState.flags.showColorPercentage} label="Show color percentage" handleChange={(val) => value.showColorPercentage(val)} />
      <Customcheckbox name="hasRugShare" checked={flagState.flags.hasRugShare} label="Show has RugShare" handleChange={(val) => value.hasRugShare(val)} />
      <Customcheckbox name="showSaveImage" checked={flagState.flags.showSaveImage} label="Show save image" handleChange={(val) => value.showSaveImage(val)} />
      <Customcheckbox name="fullPageThumb" checked={flagState.flags.fullPageThumb} label="Full page thumb" handleChange={(val) => value.fullPageThumb(val)} />
      <Customcheckbox name="allowCreateYourRugTemplate" checked={flagState.flags.allowCreateYourRugTemplate} label="Allow create your rug template" handleChange={(val) => value.allowCreateYourRugTemplate(val)} />

      <div>
        <h2>Create Your Rug</h2>
      </div>
      <Customtextbox name="default Zoom"  value={flagState.flags.createYourRug.defaultZoom} label="default Zoom" handleChange={(val) => value.defaultZoom(val)} />

      <div className='Submit'>
        <input type="submit" onClick={() => value.submitDispatch(true, handleSubmit)} />
      </div>

      {flagState.submitted && <textarea id="story" name="story" rows="10" cols="50">
        {JSON.stringify(initialState.flags)}
      </textarea>}
    </>
  )
  }
