import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white border border-[#F0E7D8] shadow-md">
        <CardHeader>
          <CardTitle className="text-[#33658A] font-bold flex justify-center">Register Here</CardTitle>
          <CardDescription className="text-[#33658A] flex justify-center">
            Enter your details below to register
          </CardDescription>
        </CardHeader>
        <CardContent className="text-[#33658A]">
          <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                <Label htmlFor="name" className="font-bold">Name</Label>
                <Input
                  id="name"
                  type="string"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="font-bold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="font-bold">Password</Label>
                  
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" variant="main">
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already registered?{" "}
              <a href="#" className="underline underline-offset-4 font-bold">
                Login here
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
