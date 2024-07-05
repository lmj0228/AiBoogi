export default function TailInput({ type, inputRef, handleChange, ph }) {
    return (
        <input type={type}
                ref={inputRef}
                onChange={handleChange}
                className="bg-grey-50 border
                             border=grey-300
                             text-grey-900
                             text-sm rounded-lg
                             focus:ring-blue-500
                             focus:border-blue-500
                             block w-full p-2.5"
                             placeholder={ph} />
    )
}
