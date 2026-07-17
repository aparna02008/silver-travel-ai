import React from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode.react'
import { Download, ArrowLeft } from 'lucide-react'
import { useSessionStore } from '../hooks/useSessionStore'

function Ticket() {
  const navigate = useNavigate()
  const { session } = useSessionStore()
  const ticketRef = React.useRef()

  const generateTicketNumber = () => {
    return `ST${Date.now().toString().slice(-10)}`
  }

  const handleDownload = () => {
    const canvas = ticketRef.current.querySelector('canvas')
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `ticket-${generateTicketNumber()}.png`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white mb-6 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden" ref={ticketRef}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Silver Travel AI</h1>
            <p className="text-blue-100">Digital Ticket</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Ticket Number</p>
              <p className="text-3xl font-bold text-gray-800">{generateTicketNumber()}</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <QRCode value={JSON.stringify(session)} size={256} level="H" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(session).map(([key, value]) => (
                <div key={key} className="border-t pt-3">
                  <p className="text-gray-600 text-sm font-semibold uppercase">{key}</p>
                  <p className="text-gray-800 text-lg font-bold">{JSON.stringify(value).slice(0, 30)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-6 border-t">
            <button onClick={handleDownload} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket