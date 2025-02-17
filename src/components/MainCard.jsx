export default function MainCard() {
  return (
    <div className="bg-cyan-600 flex flex-col rounded-md text-center px-5">
      <h1 className="pt-5 text-5xl">Chicago</h1>
      <img className=" pt-3 place-self-center" src="src/assets/react.svg" alt="logo" style={{width: '50px'}} />
      <h3 className="pt-3 text-xl">sunny/clear</h3>
      <h3 className="py-3 pb-5 text-xl">65F</h3>
    </div>
  )
}
