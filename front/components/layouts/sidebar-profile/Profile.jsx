import { useState, useRef } from "react";
import {
    Avatar, 
    AvatarBadge,
    Badge,
    Button,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'

function Profile(){
    const [userProfile, setUserProfile]= useState(null)

    const {isOpen, onOpen, onClose}= useDisclosure ()
    const profileImage = useRef(null)

    const openChooseImage =()=>{
        profileImage.current.click()
    }

    const changeProfileImage = event =>{
        const ALLOWED_TYPES= ['image/png', 'image/jpeg', 'image/jpg']
        const selected = event.target.files[0]

        if(selected & ALLOWED_TYPES.includes(selected.type)){
            let reader = new FileReader()
            reader.onloadend = () => setUserProfile(reader.result)
            return reader.readAsDataURL(selected)
        }
        onOpen()
    }
    
    return(
        <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
            <Avatar
            size="2xl"
            name="Don willfried"
            cursor="pointer"
            onClick={openChooseImage}
            src={userProfile ? userProfile: 'img/tim-cook.jpg'}
            >

                <AvatarBadge bg="brand.blue" boxSize="1em">
                 <svg>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    />
                 </svg>

                </AvatarBadge>
            </Avatar>
            <input
            hidden
            type="file"
            ref={profileImage}
            onChange={changeProfileImage}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader> une erreur s'est produite</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text> fichier non supporté!</Text>
                        <HStack mt={1}>
                            <Text color='brand.cadet' fontSize="sm">
                                types supporté


                            </Text>
                            <Badge colorScheme="green">PNG</Badge>
                            <Badge colorScheme="green">JPG</Badge>
                            <Badge colorScheme="green">JPEG</Badge>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>fermé</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
            <VStack spacing={1}>
                <Heading as="h3" fontSize="xl" color="brand.dark">
                    Don WILLFRIED

                </Heading>
                <Text color="brand.gray" fontSize="sm">
                    Econome

                </Text>

            </VStack>

        </VStack>
    )
}
export default Profile