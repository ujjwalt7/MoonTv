import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { tags } from "@/components/values"
import { FaFilter } from "react-icons/fa"

export function FitlerDropDown() {
  return (
    <DropdownMenu className="h-full">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent border-transparent backdrop-blur-xl text-black">
        <FaFilter />
        <span className="">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Results</DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Gerne</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {
                  tags.map((e,i)=>(

                    <DropdownMenuItem key={"genreKeyFilter"+i}>{e.name}</DropdownMenuItem>
                  ))
                }
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
