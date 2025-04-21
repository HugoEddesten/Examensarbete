import { Card, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";
import { Link } from "react-router-dom";


const workspaces = [
  {
    workspaceId: 'd890a548-38ca-46e3-832d-66b80f67312d',
    name: 'Test Workspace',
    boards: [
      {
        name: 'Activities',
        items: [
          {
            name: 'buy snus'
          }
        ],
        posX: 100,
        posY: 100,
        width: 80,
        height: 200,
      },
    ]
  } as const,
  {
    workspaceId: '826620fb-008f-43d6-9449-2c3fbaf6fd86',
    name: 'Test Workspace',
    boards: [
      {
        name: 'Activities',
        items: [
          {
            name: 'buy snus'
          }
        ],
        posX: 100,
        posY: 100,
        width: 80,
        height: 200,
      },
    ]
  } as const,
  {
    workspaceId: '04b4c3da-e9d9-4ed6-a51e-1a4698f11556',
    name: 'Test Workspace',
    boards: [
      {
        name: 'Activities',
        items: [
          {
            name: 'buy snus'
          }
        ],
        posX: 100,
        posY: 100,
        width: 80,
        height: 200,
      },
    ]
  } as const,
];

export default function Home() {
  return (
    <div className="p-2">
      <PageTitle>Your boards</PageTitle>

      <div className="flex gap-6 p-6">
        {workspaces.map((w) => (
          <Link to={`/workspace/${w.workspaceId}`}
          >
            <Card className="w-48 h-48 p-4 cursor-pointer">
              <CardTitle>{w.name}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}