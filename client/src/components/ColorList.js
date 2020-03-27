import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/api'

const initialColor = {
  color: "",
  code: { hex: "" }
 
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // let key= 666

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`api/colors/${colorToEdit.id}`, {...colorToEdit})
    .then(result => {
      updateColors([...colors.filter(color => color.id !== colorToEdit.id), result.data])
    })
  };



  const deleteColor = color => {
    // code below was an accident. it added extra instances of colors on the color list when you tried to delete. its an interesting glitch so im keeping it in the comment for later use!

    // axiosWithAuth()
    // .put(`api/colors/${colorToEdit.id}`, {...colorToEdit})
    // .then(result => {
    //   updateColors(
    //     [...colors.filter(color => color.id !== colorToEdit.id), result.data])
    // })

    axiosWithAuth()
    .delete(`api/colors/${color.id}`)
    .then(() => updateColors(colors.filter(col => col.id !== color.id)))
  };



  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
