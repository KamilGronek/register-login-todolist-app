const showList = (props) => {
  return (
    <>
      <div className="col-4 offset-4">
        {props.tab.map((element) => (
          <div key={element.id}>
            <div className="form-group row d-flex justify-content-center">
              <strong style={{ paddingRight: "10px" }}>
                {props.editable && props.editableId === element.id ? (
                  <input
                    className="form-control"
                    type="text"
                    name="text"
                    value={element.text}
                    onChange={(e) => props.handleValue(e, element.id)}
                  />
                ) : (
                  element.text
                )}
              </strong>
              {props.editable && props.editableId === element.id ? (
                <button
                  className="editBtn btn btn-success"
                  onClick={() => props.handleEdit(element.id, element.text)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="editBtn btn btn-warning"
                  onClick={() => props.editMode(element.id)}
                >
                  Edit
                </button>
              )}
              <button
                className="editBtn btn btn-danger"
                onClick={(e) => props.handleDelete(element.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default showList;
