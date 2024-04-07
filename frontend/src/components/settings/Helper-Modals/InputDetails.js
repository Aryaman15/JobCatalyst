import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from "@chakra-ui/react";
import axios from 'axios';
import { ChatState } from '../../../UserContext';


function InputDetails({ title, label, purpose, PlaceHolder, UserInformation, setUserInformation }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [selectedSkill, setSelectedSkill] = useState({ name: "", proficiency: "" });
    const [error, setError] = useState("");
    const {user}=ChatState()

    const onSumitHandler =async () => {
       
            try {
                    if (!selectedSkill.name.trim() || !selectedSkill.proficiency.trim()) {
                        setError("Please fill in all fields.");
                        return;
                    }
                    const config = {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${user.token}`,
                        },
                      };

                    const response=await axios.post("http://localhost:5000/api/user/add-skill",{skill:selectedSkill},config)

                    if(!response)
                    {
                        console.log("Error in adding ")
                    }
                    console.log(response.data)
                    const skillId=response.data.skillId
                    const finalSkill={
                        ...selectedSkill,
                        skillId:skillId
                    }
                    setUserInformation((data) => ({
                        ...data,
                        [purpose]: [...data[purpose], finalSkill]
                    }));
                    console.log(UserInformation)

                } catch (error) {
                    console.log(error)
                }
                
                setSelectedSkill({ name: "", proficiency: ""});
        setError("");
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen} variant="outline" colorScheme="blue">Add Info</Button>
            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>{label}</FormLabel>
                        
                                    <div>
                                        <FormControl className='flex flex-col gap-2'>
                                            <Input
                                                ref={initialRef}
                                                placeholder='Enter Skill'
                                                value={selectedSkill.name}
                                                onChange={(e) => setSelectedSkill({ ...selectedSkill, name: e.target.value })}
                                                isRequired
                                            />
                                            <Select
                                                placeholder='Select proficiency'
                                                value={selectedSkill.proficiency}
                                                onChange={(e) => setSelectedSkill({ ...selectedSkill, proficiency: e.target.value })}
                                                isRequired
                                            >
                                                <option value='Beginner'>Beginner</option>
                                                <option value='Intermediate'>Intermediate</option>
                                                <option value='Advanced'>Advanced</option>
                                            </Select>
                                        </FormControl>
                                    </div>
                        </FormControl>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onSumitHandler}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default InputDetails;
