function PreProcText({ defaultValue, onChange }) {
    return (
        <>
            {/*<label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>*/}
            <textarea className="form-control" rows="8" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </>  
  );
}

export default PreProcText;