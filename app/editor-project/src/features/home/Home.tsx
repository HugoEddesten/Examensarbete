import { Card, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";
import { Link } from "react-router-dom";
import { useWorkspaces } from "../workspace/api/useWorkspaces";


export default function Home() {
  const { data } = useWorkspaces()

  return (
    <div className="p-2">
      <PageTitle>Your boards</PageTitle>

      <div className="flex gap-6 p-6">
        {data.map((w) => (
          <Link to={`/workspace/${w.id}`}
          >
            <Card className="w-48 h-48 p-4 cursor-pointer">
              <CardTitle>{w.title}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}