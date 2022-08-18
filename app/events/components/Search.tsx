import { Text, Group, Select } from "@mantine/core"
import { forwardRef, memo } from "react"
import { useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import getAllEvents from "app/events/queries/getAllEvents"

function Search() {
  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    label: string
    description: string
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  )
  // const currentUser = useCurrentUser()
  const [Templates] = useQuery(getAllEvents, {
    select: {
      title: true,
      description: true,
      id: true,
    },
  })
  //Take only the name and description from the Templates array and save it in the data aray
  const data = Templates.map((template) => {
    return {
      label: template.title,
      description: template.description,
      value: template.title,
      id: template.id,
    }
  })
  const router = useRouter()
  return (
    <>
      <Select
        label="Search"
        radius="xl"
        placeholder="Seach For Templates"
        itemComponent={SelectItem}
        data={data}
        searchable
        onSearchChange={(value) => {
          const template = data.find((template) => template.value === value)
          if (template) {
            router.push("/events/[eventId]", `/events/${template.id}`)
          }
        }}
        maxDropdownHeight={400}
        nothingFound="Nobody here"
        transition="scale-y"
        transitionDuration={500}
        transitionTimingFunction="ease"
        filter={(value, item) =>
          item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim())
        }
      />
    </>
  )
}

export default memo(Search)