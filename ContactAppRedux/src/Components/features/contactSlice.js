import {createSlice, nanoid } from '@reduxjs/toolkit'

const LSContacts = localStorage.getItem("contacts") !== null ?  JSON.parse(localStorage.getItem("contacts")) : [];


const initialState = {
    contacts: LSContacts
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact: (state, action) => {
            const contact = {
                id: nanoid(),
                name: action.payload.name,
                number: action.payload.number,
            }
            state.contacts.push(contact)
            localStorage.setItem("contacts", JSON.stringify(state.contacts.map((contact => contact))))
        },
        removeContact: (state, action) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
            localStorage.setItem("contacts", JSON.stringify(state.contacts.map((contact => contact))))
        }
    }
})
export const { addContact, removeContact, searchContact } = contactSlice.actions

export default contactSlice.reducer;