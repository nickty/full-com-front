import React from 'react'

const CategoryForm = ({handleSubmit, name, setName}) => {
    return <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="name">Name</label>
                <input placeholder="Type category name" className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} autoFocus required />
                <button type="submit" disabled={!name} className="btn btn-primary mt-3">Submit</button>
            </div>
        </form>
}

export default CategoryForm
