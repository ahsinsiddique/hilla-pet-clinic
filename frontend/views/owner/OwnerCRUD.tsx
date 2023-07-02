
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { Select } from "@hilla/react-components/Select.js";
import { Button } from "@hilla/react-components/Button.js";
const criteria = [
    { label: "Bird", value: "bird" },
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Hamster", value: "hamster" },
    { label: "Lizard", value: "lizard" },
    { label: "Snake", value: "snake" },
];
export default function OwnerCrud() {


    return (
        <>
            <VerticalLayout theme="spacing" style={{ alignItems: 'center', }}>
                <TextField label="First Name" style={{ width: "20%" }} value="" placeholder="First Name" />
                <TextField label="Last Name" style={{ width: "20%" }} value="" placeholder="Last Name" />
                <Select style={{ width: "20%" }}
                    label="Type"
                    items={criteria}
                    value={criteria && criteria[0]?.value}
                />
                <Button theme="primary">Save</Button>
            </VerticalLayout>

        </>
    )
}