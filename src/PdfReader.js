import React, {useLayoutEffect, useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
// import * as pdfjsLib from 'pdfjs-dist/webpack'

const fetchPdf = (docid) => {
    return fetch('/pdf.json', {
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          }
    }).then(r => r.json())
}

const PdfReader = (props) => {
    const scale = 4;
    const pdfDoc = useRef(null);
    const canvasRef = useRef(null);
    const [adapter, setAdapter] = useState({
        ratio: 1,
        viewport: {
            width: props.width,
            height: props.height
        }
    });

    const resetAdapter = async () => {
        const page = await pdfDoc.current.getPage(1);
        const viewport = page.getViewport({scale});
        const ratio = props.width / viewport.width;
        setAdapter({ratio, viewport});
    }

    const open = async () => {
        try {
            const res = await fetchPdf(props.docid);
            // const data = window.atob();
            const newPdfDoc = await window.pdfjsLib.getDocument({
                data: window.atob(res.data)
            }).promise;
            pdfDoc.current = newPdfDoc;
            await resetAdapter();
        } catch (error) {
            console.log(error)
        }
    }

    const renderPdf = async () => {
        const page = await pdfDoc.current.getPage(5);
        await page.render({
            viewport: adapter.viewport,
            canvasContext: canvasRef.current.getContext('2d')
        }).promise;
    }

    const validPdf = () => {
        return !!props.docid && !!pdfDoc.current;
    }

    useLayoutEffect(() => {
        if (props.docid) {
            open();
        }
    }, [props.docid])
    
    useEffect(() => {
        if (validPdf()) {
            renderPdf();
        }
    }, [adapter])

    if (!validPdf()) {
        return null;
    }
    const style = {
        width: `${props.width}px`,
        height: `${props.height}px`,
        backgroundColor: 'rgb(0 0 0 / 27%)'
    }
    const { width: canvasW, height: canvasH } = adapter.viewport;
    const canvasStyle = {
        width: `${canvasW * adapter.ratio}px`,
        height: `${canvasH * adapter.ratio}px`
    }

    return (
        <div style={style}>
            <h1>当前的pdf doc id： {props.docid}</h1>
            <canvas ref={canvasRef} width={canvasW} height={canvasH} style={canvasStyle}></canvas>
        </div>
    )
}

PdfReader.propTypes = {
    docid: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
}

PdfReader.defaultProps = {
    docid: '',
    width: 1200,
    height: 600
}

export default PdfReader;