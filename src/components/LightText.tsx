import React from "react";
interface ILight {
    filter: string;
    str: any
}
export const LightText = (props: ILight) => {
    const { filter, str } = props
    if (!filter) return str
    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)
    if (matchValue) {
        return str.split(regexp).map((s:string, index:number, array:[]) => {
            if (index < array.length - 1) {
                const c = matchValue.shift()
                return <React.Fragment key={index}>{s}<span  className="yellowText">{c}</span></React.Fragment>
            }
            return s
        })
    }
    return str
}
