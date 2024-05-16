import { PropsWithChildren } from "react"

export const Button = ({ children, type, onClick, size }: PropsWithChildren<{ type: 'adding' | 'canceling' | 'confirming' | 'filtering', size?: string, onClick: () => void }>) => {
    let style =`rounded-xl hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 cursor-pointer  `

    // Look into whether you can have conflicting text styles e.f. text-3xl text-lg
    if (type ==='adding') {
        style +='py-2 px-3 text-3xl transition ease-in duration-150 hover:scale-125 hover:px-10 bg-yellow-500 m-4 '
    } else if (type ==='canceling' ){
        style +='bg-yellow-500 py-2 px-4 transition ease-in duration-150 hover:scale-125 bg-yellow-500 '
    }else if(type==='confirming'){
        style +='bg-yellow-500 ml-10 py-2 px-4 transition ease-in duration-150 hover:scale-125 bg-yellow-500 '
    }else if(type==='filtering'){
        style+='bg-none p-3 rounded-full '
    }
    
    if(size==='lg'){
        style+='text-lg'
    }else if(size==='md'){
        style+='text-md'
    }else if(size==='sm'){
        style+='text-sm'
    }



    return <button className={style} onClick={onClick}>{children}</button>
}