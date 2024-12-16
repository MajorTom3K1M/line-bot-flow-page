'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

import MermaidDiagram from '@/components/MermaidDiagram';
import Link from 'next/link'

export default function Component() {
  const [isFlowVisible, setIsFlowVisible] = useState(false);

  const toggleFlowVisibility = () => {
    setIsFlowVisible(!isFlowVisible)
  }

  useEffect(() => {
    import("mermaid").then((mermaid) => {
      mermaid.default.initialize({ startOnLoad: true });
      mermaid.default.contentLoaded();
    });
  }, []);

  const flowchart = `
  flowchart TD
      Start([Start])
      End([End])
      UserInput{User Input}
      UserInputShopping{User Input}
      ShoppingCart{ใส้ตระกร้า}
      ShoppingCart2{ใส้ตระกร้า}
      ShowList([แสดงรายการสินค้า])
      ShowHistory([แสดงประวัติ])
      DoSomethingElse([Do Something Else])
      Welcome{{"Welcome Message"}}
      ShoppingMessage{{"ข้อความชำระเงิน"}}
      ShowCart([แสดงตะกร้า])
      ShowList2([แสดงรายการสินค้า])
      PaymentMessage{{"ข้อความชำระเงิน + แสดงเลขบัญชี"}}
      UploadEvidence[/Upload Image/]
      FinishMessage{{"ชำระเสร็จสิ้น"}}
      ShareLocation[/Share Location/]
      ThankyouMessage{{"ข้อความขอบคุณ"}}

      Start --> Welcome
      Welcome --> UserInput
      UserInput -->|Promt : รายการสินค้า, ลิสต์, ลิส, สินค้า, product, buy, ซื้อ, shop, ช็อป| ShowList
      UserInput -->|Promt : examine, check, เช็ค, ประวัติการสั่งซื้อ, history| ShowHistory
      UserInput -->|Other| DoSomethingElse
      ShowList --> ShoppingCart
      ShoppingCart --> |No| UserInput
      ShoppingCart --> |Yes| ShoppingMessage
      ShoppingMessage --> UserInputShopping
      UserInputShopping --> |Promt : รายการสินค้า, ลิสต์, ลิส, สินค้า, product, buy, ซื้อ, shop, ช็อป| ShowList2
      UserInputShopping --> |Promt : ตรวจสอบ, examine, cart, ตะกร้า| ShowCart
      UserInputShopping --> |Promt : ชำระ, ยืนยัน, pay, payment, checkout, check out, เสร็จ, เรียบร้อย| PaymentMessage
      UserInputShopping --> |Promt : ไม่, cancel, เลิก, delete, ลบ, remove| UserInput
      ShowList2 --> ShoppingCart2
      ShoppingCart2 --> |No| UserInputShopping
      ShoppingCart2 --> |Yes| ShoppingMessage
      ShowCart --> UserInputShopping
      PaymentMessage --> UploadEvidence
      UploadEvidence --> FinishMessage
      FinishMessage --> ShareLocation
      ShareLocation --> ThankyouMessage
      ThankyouMessage --> End
      ShowHistory --> UserInput
      DoSomethingElse --> UserInput
  `

  return (
    <div className="container mx-auto px-4 py-8">

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Line Bot QR Code</CardTitle>
          <CardDescription>Scan this QR code to access our Line bot</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {/* <QRCodeSVG value="https://line.me/R/ti/p/@your-line-bot-id" size={200} /> */}
          <img src="https://qr-official.line.me/gs/M_849rolos_BW.png?oat_content=qr"></img>
          <p className="mt-4 text-sm text-gray-600">Scan with your Line app to start chatting with our bot</p>

          <Button
            onClick={toggleFlowVisibility}
            className="mt-8"
            variant="outline"
          >
            {isFlowVisible ? (
              <>
                Hide Interaction Flow <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show Interaction Flow <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {isFlowVisible && (
            <div className="mt-8 w-full overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4">Bot Interaction Flow</h3>
              <MermaidDiagram
                chart={flowchart}
              />
            </div>
          )}

          <div className="mt-8 w-full flex justify-center">
            <Link href="https://rose-chat-bot.jkrn.me" passHref>
              <Button variant="secondary">
                Access Admin Page
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}