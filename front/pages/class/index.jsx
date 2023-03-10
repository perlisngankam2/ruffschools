import { 
  Box, 
  Flex,
  Button,
  ButtonGroup,
  IconButton ,
  Center,
  Hide,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Link,
  Avatar,
  Icon,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  FormControl,
  FormLabel,
  useToast,
  AlertDialogHeader
  
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import React, { use, useEffect, useState } from "react";
import AddNew from "../../components/atoms/AddNew";
import StudentBox from "../../components/atoms/StudentBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { 
  GET_ALL_CLASS,
  GET_ALL_PERSONNELS,
  GET_ALL_ANNEE_ACADEMIQUE,
  GET_ALL_COURSES
} from "../../graphql/Queries";
import { 
  DELETE_SALLE,
  CREATE_PERSONNEL_SALLE,
  CREATE_MONTANT_SCOLARITE_CLASS,
 } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import {IoIosAdd} from 'react-icons/io';
import{ FiEdit} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';


const Class = () => {

  const router = useRouter();
  const cancelRef = React.useRef()
  const toast = useToast();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const { isOpen:isOpenn, onClose:onClosse, onOpen:onOpenn } = useDisclosure();
  const { isOpen:isOpennes, onClose:onClosses, onOpen:onOpennes } = useDisclosure();
  const [salleId, setSalleId] = useState("");
  const [personnelId, setPersonnelId] = useState("");
  const [anneeAcademiqueId, setAnneeAcademiqueId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [montant, setMontant] = useState();

  const [deleteClasse] = useMutation(DELETE_SALLE);
  const {data:dataClasse} = useQuery(GET_ALL_CLASS);
  const {data:dataEnseignant} = useQuery(GET_ALL_PERSONNELS);
  const {data:dataAnneeAcademique} = useQuery(GET_ALL_ANNEE_ACADEMIQUE);
  const {data:dataCourse} = useQuery(GET_ALL_COURSES);
  const [createPersonnelSalle] = useMutation(CREATE_PERSONNEL_SALLE);
  const [createMonantPensionClasse] = useMutation(CREATE_MONTANT_SCOLARITE_CLASS);

  const removeClass = async(id) => {
    await deleteClasse({
      variables: {id},
      refetchQueries: [{
        query: GET_ALL_CLASS
      }]
    })
    onClose();
  }

  useEffect(() => {
    console.log(dataClasse?.findAllsalle);
  })
  // const handleClose = () => {
  //   setShow(false)
  // }

  const addPersonnelSalle = async () => {
    await createPersonnelSalle({
      variables:{
        input:{ 
        salleId: salleId,
        personnelId: personnelId,
        courseId: courseId
        }
      }
    })
    onClosse();
    toast({
      title: "Affection du personnel a la salle.",
      description: "Affecte avec succes.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setPersonnelId("")
    setSalleId("")
  }

  const AddMontantPensionClasse = async () =>{
    await createMonantPensionClasse({
      variables:{
        pension:{
          salleId: salleId,
          anneeAcademiqueId: anneeAcademiqueId,
          montant: parseInt(montant)
        }

      }
    })
      onClosses();
        // console.log(sectionData)
      toast({
          title: "Affection du montqnt de scolarite a une classe.",
          description: "Qffection reussit.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      // router.push("/class/cyclesection")
    setSalleId("");
    setAnneeAcademiqueId("");
    setMontant("");
  }

  
  return (
    <DefaultLayout>
      <Box p="10px" pt={"70px"} background="colors.tertiary" w="full">
        <Flex gap={5} flexWrap="wrap">
          <AddNew />

          <StudentBox class="CM2" studentnumber="40" />
          <StudentBox class="SIL" studentnumber="23" />
          <StudentBox class="CP" studentnumber="16" />
          <StudentBox class="CM1" studentnumber="34" />
        </Flex>

      <Box p="3" pt={"80px"} w="full">
        <Flex
          align="center"
          justify="space-between"
          boxShadow="md"
          p="5"
          rounded="lg"
          background="white"
        >
          <Heading
            textAlign="center"
            color="WindowText"
            size="lg"
            textColor="pink.300"
          >
            Liste des classes
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Classes / Liste classes</Text>
          </Hide>
        </Flex>

        <Flex gap={10} mt={5}>
          <InputGroup>
            <Input
              placeholder="Rechercher un ??l??ve..."
              //value={recherche}
              // onChange={e => setQuery(e.target.value)}
            />
          </InputGroup>
          <Select 
            placeholder="Selectionner la classe"
            // onChange={e =>setQuery(e.target.value)}
          >
            {/* {Classes.map((classe) => (
              <option 
                key={classe.id}
              >{classe.classe}</option>
            ))} */}
          </Select>
          <Box> 
            <Button
                rightIcon={<Icon as={IoIosAdd} boxSize="20px" />}
                onClick={() => router.push("/class/addclass")}
              >
                Ajouter une classe
            </Button>
          </Box> 
        </Flex>

        {/* FORMULAIRE D'AFFECTATION D'UN PROFESSEUR A UNE CLASSE */}
        <Box> 
          <Flex gap={1} ml={["200px","300px", "700px"]} mt={["10px"]}> 
            <Text 
              mb={5}
              fontSize="14px"
              color = "colors.quinzaine"
              >
              Affecter un enseignant
            </Text>
            <Icon 
              as={IoIosAdd} 
              boxSize="30px"
              color={"colors.greencolor"}
              rounded="full"
              // ml={["5px", "5px", "5px" ]}
              mt={["-3px"]}
              _hover={{background:"colors.bluecolor"}}
              onClick={onOpenn}
              />
          </Flex>
          <AlertDialog
            isOpen={isOpenn}
            leastDestructiveRef={cancelRef}
            onClose={onClosse}
            size='xl'
          >
            <AlertDialogOverlay>
              <AlertDialogContent  width={"400px"}>
                <Box mt={"20px"}> 
                    <Heading 
                      textAlign="center"
                      size="md"
                    >
                      Affectez un enseignant a une classe
                    </Heading>
                    <AlertDialogBody>
                      <Box mt='4'>
                        <FormControl mt="5px">
                          <FormLabel>classe</FormLabel>
                          <Select
                            name="salleId"
                            placeholder="classe"
                            value={salleId}
                            onChange={(event)=> setSalleId(event.target.value)}
                          >
                            {dataClasse && 
                              dataClasse.findAllsalle.map((salle, index) =>(
                                <option value={salle?.id}>
                                  {salle.name}
                                </option>
                              ))

                            }
                          </Select>
                        </FormControl>
                        <FormControl mt={"10px"}>
                            <FormLabel>Enseigant</FormLabel>
                          <Select
                            // type="text"
                            name="personnelId"
                            value={personnelId}
                            onChange={(event)=> setPersonnelId(event.target.value)}

                            // isDisabled
                            placeholder="enseignant"
                          >
                            {dataEnseignant &&
                              dataEnseignant?.findAllpersonnel.map((personnel, index) =>(
                                <option value={personnel?.id} key={index}>
                                  {personnel.firstName} 
                                </option>
                              ))
                            }
                          </Select>
                        </FormControl>
                        <FormControl mt={"10px"}>
                            <FormLabel>Enseigant</FormLabel>
                          <Select
                            name="courseId"
                            value={courseId}
                            onChange={(event)=> setCourseId(event.target.value)}
                            placeholder="Matiere"
                          >
                            {dataCourse &&
                              dataCourse?.findAllCourse.map((course, index) =>(
                                <option value={course?.id} key={index}>
                                  {course.title} 
                                </option>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Box>
                    </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button 
                      ref={cancelRef} 
                      onClick={onClosse} 
                      colorScheme='red' 
                    >
                      annuler
                    </Button>
                  <Link href={'#'}>
                      <Button 
                        colorScheme='green'  
                        ml={3}
                        onClick={addPersonnelSalle}
                      >
                        Affectez  
                    </Button>
                    </Link> 
                  </AlertDialogFooter>
                </Box>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>

{/* FORMULAIRE D'AFFECTATION DE LA PENSION POUR UNE ANNEE ACADEMIQUE */}

    <Box>
      <Flex gap={1} ml={["200px","300px", "700px"]} mt={["10px"]}> 
        <Text 
          mb={5}
          fontSize="14px"
          color = "colors.quinzaine"
        >
          Ajouter la pension de la classe
        </Text>
        <Icon 
          as={IoIosAdd} 
          boxSize="30px"
          color={"colors.greencolor"}
          rounded="full"
          // ml={["5px", "5px", "5px" ]}
          mt={["-3px"]}
          _hover={{background:"colors.bluecolor"}}
          onClick={onOpennes}
          />
      </Flex>
      <AlertDialog
        isOpen={isOpennes}
        leastDestructiveRef={cancelRef}
        onClose={onClosses}
        size='xl'
      >
        <AlertDialogOverlay>
          <AlertDialogContent  width={"400px"}>
            <Box mt={"20px"}> 
                <Heading 
                  textAlign="center"
                  size="md"
                >
                  Ajoutez une pension
                </Heading>
                <AlertDialogBody>
                  <Box mt='4'>
                    <FormControl mt="5px">
                      <FormLabel>classe</FormLabel>
                      <Select
                        name="salleId"
                        placeholder="classe"
                        value={salleId}
                        onChange={(event)=> setSalleId(event.target.value)}
                      >
                        {dataClasse && 
                          dataClasse.findAllsalle.map((salle, index) =>(
                            <option value={salle?.id}>
                              {salle.name}
                            </option>
                          ))

                        }
                      </Select>
                    </FormControl>
                    <FormControl mt={"10px"}>
                        <FormLabel>Montant scolarite</FormLabel>
                      <Input
                        // type="text"
                        name="montant"
                        value={montant}
                        onChange={(event)=> setMontant(event.target.value)}
                        // isDisabled
                        placeholder="Montant de la scolarite"
                      />
                    </FormControl>
                    <FormControl mt={"10px"}>
                        <FormLabel>Enseigant</FormLabel>
                      <Select
                        // type="text"
                        name="anneeAcademiqueId"
                        value={anneeAcademiqueId}
                        onChange={(event)=> setAnneeAcademiqueId(event.target.value)}

                        // isDisabled
                        placeholder="Annee academique"
                      >
                        {dataAnneeAcademique &&
                            dataAnneeAcademique.findAllAnnerAccademique.map((anneeAcademique, index) => (
                              <option value={anneeAcademique.id} key={index}>
                                {anneeAcademique.name}
                              </option>
                            ))
                          }
                      </Select>
                    </FormControl>
                  </Box>
                </AlertDialogBody>
              <AlertDialogFooter>
                <Button 
                  ref={cancelRef} 
                  onClick={onClosses} 
                  colorScheme='red' 
                >
                  annuler
                </Button>
              <Link href={'#'}>
                  <Button 
                    colorScheme='green'  
                    ml={3}
                    onClick={AddMontantPensionClasse}
                  >
                    Affectez  
                  </Button>
                </Link> 
              </AlertDialogFooter>
            </Box>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>

{/* LISTE DES CLASSES */}
        <Box mt={10}>
           <TableContainer>
              <Table variant='striped'>
                  <Thead>
                  <Tr>
                      <Th>Nom</Th>
                      <Th>Montant pension</Th>
                      {/* <Th >section</Th>  */}
                      <Th >Action</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                  {dataClasse && ( 
                     dataClasse.findAllsalle.map((salle, index) =>(
                      <Tr key={index}>
                        <Td borderColor={'#C6B062'}>{salle.name}</Td>
                        <Td borderColor={'#C6B062'}>{salle.montantPensionSalle}</Td>
                        {/* <Td borderColor={'#C6B062'}>{salle.section}</Td> */}
                        {/* <Td borderColor={'#C6B062'}>{salle.montantPension}</Td> */}

                        {/* <Td borderColor={'#C6B062'}>
                            <Avatar 
                                size='xs' 
                                name='Dan Abrahmov' 
                                src='https://bit.ly/dan-abramov'
                            /> 
                        </Td> */}
                        
                        <Td borderColor={'#C6B062'}>
                          <ButtonGroup 
                            size='sm' 
                            isAttached 
                            variant='link' 
                            colorScheme={'teal'}
                            >
                              <Button>
                                <Link 
                                  href='/eleves/details'
                                >Details</Link>
                              </Button>
                            </ButtonGroup> 
                          </Td>
                            <Box 
                              display="flex"
                              ml={['-140px', '-140px', '-140px', '-140px']} 
                               mt={['8px', '8px', '8px', '8px']}
                             >
                                <Link 
                                href="/class/updateclass">
                                  <Icon
                                    as={FiEdit}
                                    boxSize="40px"
                                    p="3"
                                    rounded="full"
                                    _hover={{background:"red.100"}}
                                />
                                </Link>
                                <Box href="#" mt="-3px">
                                  <Icon
                                    as={MdDelete}
                                    boxSize="44px"
                                    p="3"
                                    rounded="full"
                                    color="colors.quaternary"
                                    onClick={onToggle}
                                    _hover={{background:"blue.100"}}
                                  />
                                  <Box> 
                                    <AlertDialog
                                      isOpen={isOpen}
                                      leastDestructiveRef={cancelRef}
                                      onClose={onClose}
                                      isCentered
                                    >
                                        <AlertDialogOverlay
                                          // alignSelf={"center"}
                                        >
                                          <AlertDialogContent
                                          width={"380px"}
                                          >
                                            <AlertDialogHeader 
                                              fontSize='lg' 
                                              fontWeight='bold'
                                              textAlign={"center"}
                                              >
                                              Confirmation de suppression
                                            </AlertDialogHeader>
                                            <AlertDialogBody textAlign={"center"}>
                                            Voulez-vous supprimer cette classe?
                                            </AlertDialogBody>

                                            <AlertDialogFooter>
                                              <Button 
                                                ref={cancelRef} 
                                                onClick={onClose}
                                                colorScheme="red"
                                              >
                                                Annuler 
                                              </Button>
                                              <Button 
                                                colorScheme='green' 
                                                onClick={() => {removeClass(salle.id)}}
                                                ml={3}
                                              >
                                                Supprimer
                                              </Button>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                  </Box>
                                  </Box>
                            </Box> 
                        </Tr>
                  ))
                )}
                </Tbody>
              </Table>
            </TableContainer>
        </Box>
      </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Class;
