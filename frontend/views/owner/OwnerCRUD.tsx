
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { Select } from "@hilla/react-components/Select.js";
import { Button } from "@hilla/react-components/Button.js";
import OwnerForm from "./OwnerForm";
export const criteria = [
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
            <OwnerForm />
        

        </>
    )
}