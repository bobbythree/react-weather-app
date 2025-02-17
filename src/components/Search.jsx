import { useRef } from "react"

export default function Search() {

  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <div className="place-self-center">
      <label className="input bg-cyan-600">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g>
        </svg>
        <form ref={inputRef} onSubmit={handleSubmit}>
          <input type="text" required placeholder="Enter a Location" />
        </form>
      </label>
    </div>
    
  )
}
