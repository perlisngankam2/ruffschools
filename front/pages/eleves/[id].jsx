import { 
  Box, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Select,
  Spacing,
  FormControl,
  FormLabel,
  extendTheme, 
  HStack ,
  Heading , 
  Input, 
  Stack , 
  Checkbox,
  Center , 
  Flex , 
  Text , 
  Card ,
  CardBody ,
  VStack ,
  CardFooter ,
  CardHeader,
  Avatar , 
  IconButton , 
  BsThreeDotsVertical ,
  BiLike , 
  BiChat ,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  SimpleGrid,
  Td,
  TableCaption,
  TableContainer,
  color,
  Button,
  Hide,
  Spacer,
  br,
  Icon,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Select as Selects} from 'chakra-react-select';
import { z } from 'zod';
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { GiBoxUnpacking } from "react-icons/gi";
import {FormSelect} from "../../components/atoms/FormSelect";
import {IoIosAdd} from "react-icons/io";
import { useQuery, useMutation } from "@apollo/client";
import Routes from "../../modules/routes";
import {useForm, Controller, defaultValues } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { 
  GET_ALL_STUDENT, 
  GET_STUDENT_BY_ID, 
  GET_ALL_CLASS, 
  GET_ALL_FRAIS_INSCRIPTION, 
  GET_ALL_TRANCHE_PENSION,
  GET_TRANCHE_STUDENT_BY_STUDENT_ID,
  GET_TRANCHE_PENSION_BY_ID,
  GET_ALL_TRANCHE_STUDENT,
  GET_ALL_MONTANT_TRANCHE_BY_SALLE,
  GET_ALL_MONTANT_PENSION_CLASS,
  GET_MONTANT_PENSION_SALLE_BY_STUDENT,
  GET_ALL_TRANCHE_COMPLETE_BY_STUDENT,
  GET_STUDENT_SALLE,
  GET_CLASS_FEES_BY_STUDENT_ID

} from "../../graphql/Queries";
import {
  CREATE_TRANCHE_STUDENT, 
  CREATE_AVANCE_TRANCHE,
  CREATE_SCOLARITE_TRANCHE_STUDENT
} from "../../graphql/Mutation"


// export const getStaticPath = async() => {
//   // const apolloClient = initializeApollo();

//   // await apolloClient.query({
//   //   query: GET_ALL_STUDENT,
//   //   variables: id,
//   // });
//   // console.log(context);
 
//   // const {data: dataStudent} = useQuery (GET_ALL_STUDENT);
//   // const paths = dataStudent.findAllstudents.map((student) => ({
//   //   params: {id: [student.id]},
//   // }))
//   // const apolloClient = client
//   // const {loading, error, data} = useLazyQuery(GET_ALL_STUDENT); 

//   // if(loading){
//   //   return <div>loading</div>
//   // }
//   // if(error){
//   //   console.log(error);
//   //   return <div>Error!</div>;
//   // }

//   // console.log(data)
//   const query = router.query.id
//   const {data: dataStudent} = useQuery({GET_ALL_STUDENT});
//   const paths = dataStudent.findAllstudents.map((student) => ({
//     params: {id: [student.id]},
//   }))
//   console.log(paths);
//     return{
//       paths: [],
//       fallback: false
//     }    
// }

//  const schoolFeesSchema = z.object({
//   montant: z.number().min(2000),
//   // studentId: z.string().min(1, {message: "Name user is required"}),
//   trancheId: z.array(z.string()).min(1)
// });

const DetailComponent = () => {

  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpenns, onOpen:onOpenns, onClose:onClosses } = useDisclosure();

  const cancelRef = React.useRef()
  const [classId, setClassId] = useState("");
  const [tranchePensionId,  setTranchePensionId] = useState("");
  const [motif, setMotif] = useState("");
  const [montant, setMontant] = useState(0);
  const [trancheId, setTrancheId] = useState([]);
  const [errorss, setErrorss] = useState(null);
  const [selectedTranches, setSelectedTranches] = useState([])
  const [salleStudent, setSalleStudent] = useState(null);
  // const isDisabled = true
  // const {register, handleSubmit, control,  formState: { isSubmitting, errors }, setValue} = useForm({
  //   resolver : zodResolver(schoolFeesSchema),
  //   defaultValues: {
  //     trancheId:[],
  //     montant: 1000,
  //     // studentId: ""
  //   }
  // });
  
 
  // const [selectedTranches, setSelectedTranches] = useState([]); 
  // const {data:singleStudent} = useQuery(GET_STUDENT_BY_ID);

  const {data: dataStudent} = useQuery (GET_ALL_STUDENT);
  const {data:dataClasse} = useQuery(GET_ALL_CLASS);
  
  const {data:dataStudentId, loading, error} = useQuery(GET_STUDENT_BY_ID,
      {
        variables: {id: router.query.id}
      }
  );

  const {data:dataTrancheStudentBySudentId} = useQuery(GET_TRANCHE_STUDENT_BY_STUDENT_ID,
    {
      variables: {studentid: router.query.id} 
    }
  ); 
  const {data:dataStudentSalle} = useQuery(GET_STUDENT_SALLE,
    {
        variables: {studentid: router.query.id} 
    }
)

//PENSION PAR CLASSE DE CHQUE ELEVE
const {data:dataClassFeesByStudentId} = useQuery(GET_CLASS_FEES_BY_STUDENT_ID,
  {
    variables: {studentid: router.query.id}
  }
)
  // const {data:dataTrancheById} = useQuery(GET_STUDENT_BY_ID,
  //       {
  //         variables: {trancheid: router.query.id}
  //       }
  // );
  const {data:dataTrancheCompleteByStudent} = useQuery(GET_ALL_TRANCHE_COMPLETE_BY_STUDENT,
    {
      variables: {studentid: router.query.id} 
    }
  );

  const {data:dataPensionSalleByStudent} = useQuery(GET_MONTANT_PENSION_SALLE_BY_STUDENT,
    {
      variables: {studentid: router.query.id} 
    }
  );

    const {data:dataClass} = useQuery(GET_ALL_CLASS);
    const {data:dataFraisInscription} = useQuery(GET_ALL_FRAIS_INSCRIPTION);
    const {data:dataTranchePension} = useQuery(GET_ALL_TRANCHE_PENSION);
    const {data: dataTrancheStudent} = useQuery(GET_ALL_TRANCHE_STUDENT)
    const {data:dataTrancheById} = useQuery(GET_TRANCHE_PENSION_BY_ID);
    const [createTrancheStudent] = useMutation(CREATE_TRANCHE_STUDENT);
    const [createFeesAvanceTranche] = useMutation(CREATE_AVANCE_TRANCHE
    
    //  { 
    //   onCompleted: (data) => {
    //     console.log(data);
    //   },
    //   onError: (error) =>{
    //     console.log(error);
    //   }

    //  }
    );
    const [paySchoolFees] = useMutation(CREATE_SCOLARITE_TRANCHE_STUDENT);
       
        console.log("i")
        // const PayTrancheSchoolFees = handleSubmit(async(values) =>{
        //   console.log("i")
        //   // event.preventDefault();
        //   // const validation = schema.validate(data);
        //   // if(validation){
        //   //   const {montant, id, trancheId} = data;
        //   // const formData = new FormData(event.target);
        //   // const montant = formData.get('montant');
        //   // const trancheId = formData.get('trancheId');
        //   // const id = formData.get("id")
        //   // try {\
        //   // console.log(data)
        //     // schema.parse({ montant, trancheId });
        //     // {console.log(trancheId)}
        //     // {console.log(montant)}
        //     console.log(values.montant)  
        //     console.log(values.trancheId)         
        //      {console.log(dataStudentId.findOnestudent?.id)}
        //     try
        //     { 
        //       console.log("jjj")
        //        const result =  await createFeesAvanceTranche({
        //         variables:{
        //           avancetranche:{
        //             // trancheStudentId: "",
        //             montant: parseInt(values.montant),
        //             trancheId: values.trancheId,
        //             tranchestudentinput: {
        //               studentId: dataStudentId.findOnestudent?.id,
        //               name: "",
        //               description: "",
        //               montant : 0
        //             }
        //         }
        //       } 
        //     })
        //     {console.log("qqqq")}
        //    console.log(result)
        //     // onClose();
        //     toast({
        //       title: "paiement tranche pension.",
        //       description: " paye avec succes.",
        //       status: "success",
        //       duration: 3000,
        //       isClosable: true,
        //     });
        //     setMontant(""); 
        //   }catch(err){
        //     setErrorss(err.message)
        //   }
        //   // {console.log(data.montant)}
        //   //   {console.log(data.trancheId)}

        // })

     
        // const tranches = dataTranchePension?.findAlltranche?.map((tranche) =>
        //  ( {
        //       label: tranche?.name,
        //       value: tranche?.id
        //   })
        // )

        // const handleTrancheSelect = (selectedTranches) => {
        //   setSelectedTranches(selectedTranches?.map((tranche) => tranche.value));
        // };

      // const payChoolFeesTrancheStudent = async (id) => {
      //   console.log(id)
      //   console.log(montant)
      //   await createTrancheStudent({
      //     variables:{
      //       trancheStudent:{
      //         studentId: id,
      //         montant: parseInt(montant)
      //       }
      //     }
      //   }),
      //   onClose();
      //   toast({
      //     title: "Initialisation de la pension.",
      //     description: "Initialisation reussit.",
      //     status: "success",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      // } 
   //CODE POUR LE SELECT MULTIPLE
      
//    const totalPension = dataTrancheStudentBySudentId?.getTrancheStudentByStudent.montant;
//    console.log(totalPension)
//    const trancheMontants = dataTranchePension?.findAlltranche.map((tranche) => tranche.montant);
//    console.log(trancheMontants)
//    const indexMontantSupérieur = trancheMontants?.findIndex((montant) => totalPension >= montant);
//    console.log(indexMontantSupérieur)
//   const  newDisabledOptions = []
//    if (indexMontantSupérieur >= 0) {
//  const trancheAvecMontantSupérieur = dataTranchePension?.findAlltranche[indexMontantSupérieur];
//  newDisabledOptions.push(trancheAvecMontantSupérieur)
// //  console.log(newDisabledOptions)
//  }else if(indexMontantSupérieur >= 1){
//     const b= dataTranchePension?.findAlltranche[indexMontantSupérieur]
//     console.log(b)
//  }

  const tranches = []
    const getTrancheById = (id) => {
      return (dataTranchePension?.findAlltranche)?.find((t, i) => t.id === id)
  }

  const loadTranches = () => {
    // const trancheDisable = newDisabledOptions
    // console.log(newDisabledOptions)
    const totalPension = dataTrancheStudentBySudentId?.getTrancheStudentByStudent.montant;60
    const trancheIds = dataTranchePension?.findAlltranche.map((tranche) => tranche.id);
    console.log(trancheIds)
      dataTranchePension?.findAlltranche.map((tranche) =>{
        const trancheCompleteByStudent = dataTrancheCompleteByStudent?.getalltranchecompletedbystudent.map(tranche=>tranche.id)
        console.log(trancheCompleteByStudent)
        tranches.push(
          {
            label: tranche?.name,
            value: tranche?.id,
            isDisabled: totalPension >= tranche?.montant && trancheCompleteByStudent?.includes(tranche?.id)
           //  (il faut aussi que l'id de cette tranche soit inclu dans la liste des tranches qui sont dans avancetranche) 
            //la liste des tranches qi sont dans avance tranches et dont la somme total de tout ses avances soit superieur au montant de la tranche
          }
        )
      })
  }
           useEffect(() =>{
          loadTranches();
          // console.log(dataTranchePension?.findAlltranche.tranche.montant[0])
          // dataStudentId && console.log(dataStudentId.findOnestudent)
          // console.log(dataClass);
          //  console.log(dataFraisInscription);
          // console.log(dataClasse?.findAllsalle);

          // console.log(dataTranchePension?.findAlltranche);
          // console.log(dataTrancheStudent?.findAlltranchestudent)
          // console.log(dataPensionSalleByStudent?.findMontantPensionstudent)
            console.log(dataStudent?.findAllstudents.firstname);
          console.log(dataTrancheCompleteByStudent?.getalltranchecompletedbystudent)
          console.log(dataTrancheStudentBySudentId?.getTrancheStudentByStudent)
        })
        // console.log(dataTranchePension?.findAlltranche)

    // const AllTranche = dataTranchePension?.findAlltranche.map((tranche) => {
    //   const totalPension = dataTrancheStudentBySudentId?.getTrancheStudentByStudent.montant;
    //   if (totalPension >= tranche.montant) {
    //     return tranche;
    //   }
    // });

        const [resteMontantTranche, setResteMontantTranche] = useState([])
        // const montantTranche = getTrancheById(tranche.value)?.montant

        const addAvanceTranche = async() => {
          console.log(montant)
          console.log(selectedTranches)
          // console.log(dataStudentId?.findOnestudent.id)
          // if(montant <= dataTranchePension.findAlltranche.montant[0])
          const pension = dataStudentSalle?.findSalleByStudent?.montantPensionSalle
          // const trancheStudentByStudent = dataTrancheStudentBySudentId?.getTrancheStudentByStudent
          let totalTrancheSelectionner = 0
          selectedTranches.forEach((tranche, index) => {
            // console.log(getTrancheById(tranche.value));
              totalTrancheSelectionner += getTrancheById(tranche.value)?.montant
          })
          console.log("pension",pension);
          console.log("pension sel",totalTrancheSelectionner);
          if(totalTrancheSelectionner >= pension) {
            // if(trancheStudentByStudent == undefined ){
            let temp = montant
            console.log(temp)
            selectedTranches.map(tranche=>{
              const mont = getTrancheById(tranche.value)?.montant
              temp = temp - mont
              console.log(temp)
              setMontant(temp)
              createFeesAvanceTranche({
                variables: {
                  avancetranche:{
                    // trancheStudentId: dataTrancheStudentBySudentId?.getTrancheStudentByStudent.id,
                    montant: mont,
                    trancheId: tranche.value,
                    studentId: dataStudentId?.findOnestudent.id
                  }
                }
              })
            })
            toast({
              title: "paiement tranche pension.",
              description: " paye avec succes.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setMontant(0);
            // selectedTranches.map(tranche => tranche?.value)
          // } 
        } else if(totalTrancheSelectionner < pension){
            //  selectedTranches.map(tranche =>{
            //   let tempMontant = montant
            //   const montantTranche = getTrancheById(tranche.value)?.montant
            //   tempMontant = montantTranche - tempMontant
            //   setMontant(tempMontant)
            //   createFeesAvanceTranche({
            //     variables: {
            //       avancetranche:{
            //         trancheStudentId: dataTrancheStudentBySudentId?.getTrancheStudentByStudent.id,
            //         montant: tempMontant,
            //         trancheId: tranche.value,
            //         tranchestudentinput: {
            //           studentId: "",
            //           name: "",
            //           description: "",
            //           montant : 0
            //         }
            //       }
            //     }
            //   })
            // })
            // toast({
            //   title: "paiement tranche pension.",
            //   description: " paye avec succes.",
            //   status: "success",
            //   duration: 3000,
            //   isClosable: true,
            // });
            // setMontant(0);
          }
          
          // selectedTranches.map(tranche=> {
          // const datas = dataTranchePension?.findAlltranche.map((tranche)=> tranche.montant)
          //let montantResant  ici je vais recuperer le montant restant de toutes les tranches
          // for(let i =0; i<selectedTranches.length[i]; i++){
          // const trancheSelected = selectedTranches[i];
          //   if(montant <= datas){
          //   let restTranche = 
          //   }if (montant > datas)
          //   { 
            // }}

              // result()
          //  })
          //  if(montant > tranche.value && selectedTranches.length ==2){
          //   const montantTranche1 = dataTranchePension?.findAlltranche[0].montant
          //     const surplus = montant - montantTranche1

          //     const newTable = [dataTranchePension?.findAlltranche[0], dataTranchePension?.findAlltranche[1]]
          //     .map((tranche) => {
          //       if(tranche[0].value == newTable[0].id && tranche[1].value == newTable[1]){
          //       createFeesAvanceTranche({
          //         variables: {
          //           avancetranche:{
          //             // trancheStudentId: "",
          //             montant: parseInt(montantTranche1),
          //             trancheId: tranche.value,
          //             tranchestudentinput: {
          //               studentId: dataStudentId?.findOnestudent.id,
          //               name: "",
          //               description: "",
          //               montant : 0
          //             }
          //           }
          //         }
          //       })
          //       createFeesAvanceTranche({
          //         variables: {
          //           avancetranche:{
          //             // trancheStudentId: "",
          //             montant: parseInt(surplus),
          //             trancheId: tranche.value,
          //             tranchestudentinput: {
          //               studentId: dataStudentId?.findOnestudent.id,
          //               name: "",
          //               description: "",
          //               montant : 0
          //             }
          //           }
          //         }
          //       })

          //     }
          //     })
          //  }

            // })

          // if (tranches[0].value){  
          //   result = await createFeesAvanceTranche({
          //     variables: {
          //       avancetranche:{
          //         // trancheStudentId: "",
          //         montant: parseInt(montant),
          //         trancheId: tranches[0].value,
          //         tranchestudentinput: {
          //           studentId: dataStudentId?.findOnestudent.id,
          //           name: "",
          //           description: "",
          //           montant : 0
          //         }
          //       }
          //     }
          //   })
          // console.log(result)
        // }else if (tranches[1].value){
        //   await createFeesAvanceTranche({
        //     variables: {
        //       avancetranche:{
        //         // trancheStudentId: "",
        //         montant: parseInt(montant),
        //         trancheId: tranches[1].value,
        //         tranchestudentinput: {
        //           studentId: dataStudentId?.findOnestudent.id,
        //           name: "",
        //           description: "",
        //           montant : 0
        //         }
        //       }
        //     }
        //   })
        // }else if (tranches[2].value)
        //  { await createFeesAvanceTranche({
        //     variables: {
        //       avancetranche:{
        //         // trancheStudentId: "",
        //         montant: parseInt(montant),
        //         trancheId: tranches[2].value,
        //         tranchestudentinput: {
        //           studentId: dataStudentId?.findOnestudent.id,
        //           name: "",
        //           description: "",
        //           montant : 0
        //         }
        //       }
        //     }
        //   })
        }  
        //   onClose();
        //   toast({
        //     title: "paiement tranche pension.",
        //     description: " paye avec succes.",
        //     status: "success",
        //     duration: 3000,
        //     isClosable: true,
        //   });
        //   setMontant("");
        // }
    // if (loading) return <Text>Chargement en cour...</Text>
    // if (error) return <Text>Une erreur s'est produite!</Text>

    // const minNumberInput = if dataTrancheById.tranche.name = 
    
  return (
    <DefaultLayout >
      <Box 
        p={3} 
        pt="70px" 
        background="colors.tertiary" 
        // w='150%'
      >
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
            Détails de  l'élève
          </Heading>
          <Hide below="sm">
            <Text>Dashboad / Éleves / Liste Élèves</Text>
          </Hide>
        </Flex>
        <Center>
        <Flex 
          gap='2' 
          mt='5' 
          fontSize={'sm'}
        >

 {/* FORMULAIRE DE PAIEMENT DE SCOLARITE */}
          <Center >
            <Button 
              bg='colors.primary' 
              height='40px' 
              color='white' 
              borderRadius={'md'} 
              onClick={onOpen}
            >
              Payer la Scolarite
            </Button>
          </Center>
          <Center>
            <Button
             bg='blue.300'  
             // height='40px' 
             color='white' 
             // borderRadius={'md'}
            > 
              <Link 
               href={{
                pathname: Routes.Receipt?.path || '',
                query: {id: router.query.id}
              }}
                // "/eleves/recu/id"}
              >
                Consulter le recu
              </Link>
            </Button>
          </Center>
          <Center 
            bg='#FC8A94' 
            height='40px' 
            color='white' 
            borderRadius={'md'}
          >
            <Text m='2'>note</Text>
          </Center>
          <Center 
            bg='#5370CC'  
            height='40px' 
            color='white' 
            borderRadius={'md'}
          >
            <Text m='2'>Imprimer</Text>
          </Center>
          <Center 
            bg='#328D57'  
            height='40px' 
            color='white' 
            borderRadius={'md'}
          >
            <Text m='2'>Nouvelle Photo</Text>
          </Center>
          <Center 
            g='#FA6060' 
            height='40px' 
            color='white' 
            borderRadius={'md'}
            bg="#e2d39c"
          >
            <Text m='2'>Bulletin</Text>
          </Center>
          <Center 
            g='#60736A'  
            height='40px' 
            color='white' 
            borderRadius={'md'}
            bg="green.500"
          >
            <Text m='2'>Notifier Absence</Text>
          </Center>
          <Center 
            bg='#DA7E86' 
            height='40px' 
            color='white' borderRadius={'md'}
           >
            <Text m='2'>Envoie SMS</Text>
          </Center>
        </Flex>
      </Center>
  {dataStudentId && (
  <SimpleGrid 
    spacing={4} 
    templateColumns='repeat(auto-fill, minmax(400px, 1fr))' m='5'
  >
    <Card 
      bgColor="#CCDEDE" 
      borderWidth={'1.5px'} 
      borderColor='#E2D39C'
    >
      <CardHeader>
        <Flex 
          flexDirection={'horizontal'}
        >
        <Heading 
          size='sm'  
          color='white' 
          background={'#767676'}
        >
          <Text m='1'>
          Informations personnelles<br/>
          Annee scolaire : 2021 - 2022
          </Text>
        </Heading>
        <Avatar size='md' 
          name='Dan Abrahmov' 
          src='https://bit.ly/dan-abramov'
          ml='10' 
        />
        </Flex>
      </CardHeader>
      
      <CardBody fontSize={'sm'}>
        
        <Flex 
          flexDirection={'column'} 
          spacing='5'
        >
        <Text>
          <Text as='b'>Nom : </Text> 
            {dataStudentId.findOnestudent.firstname.toUpperCase()}
         </Text>
        <Text><Text as='b'>Prenom : </Text>
          {dataStudentId.findOnestudent.lastname}
         </Text>
        <Text><Text as='b'>Matricule : </Text>
          {dataStudentId.findOnestudent.matricule}
        </Text>
        <Text><Text as='b'>Sexe : </Text>
          {dataStudentId.findOnestudent.sex}
        </Text>
        <Text><Text as='b'>Classe : </Text>
          {dataStudentId.findOnestudent.classe}
        </Text>
        <Text><Text as='b'>Section : </Text> 
          {/* {dataStudentId.findOnestudent.section} */}
        </Text>
        <Text
         mt={"20px"} 
         fontSize={"md"}
         as="b"
        >
          Pere
        </Text>
        <Text><Text as='b'>Nom : </Text> 
          {dataStudentId.findOnestudent.fatherFirstName}
        </Text>
        <Text><Text as='b'>Contact: </Text>
          {dataStudentId.findOnestudent.fatherPhoneNumber} 
        </Text>
        <Text 
          mt={"20px"} 
          as="b"
          fontSize={"md"}
        >
          Mere
        </Text>
        <Text><Text as='b'>Nom : </Text>
          {dataStudentId.findOnestudent.motherFirstName}
        </Text>
        <Text><Text as='b'>Contact: </Text> 
          {dataStudentId.findOnestudent.motherPhoneNumber}
        </Text>
        </Flex>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
    <Card 
      bgColor="#CCDEDE" 
      borderWidth={'1.5px'} 
      borderColor='#E2D39C' 
      fontSize={'sm'}
    >
        <CardHeader>
          <Box>
            <Heading 
              size='sm'
              w={'50%'}
             >
              <Text 
                bgColor={'#767676'} 
                p='1' 
                color={'white'}
              >
                PAIEMENT SCOLARITE
              </Text>
            </Heading>
            <Box>
            <Text 
              color={'#AB9442'}
              mt={"10px"}
            >
              <Text 
                as='b' 
                color='#AB9442' 
                mr='2'
              >
                Derniere scolarite :
              </Text>
                {dataTrancheStudentBySudentId?.getTrancheStudentByStudent.montant} FCFA
            </Text> 
              <Box fontWeight={800}>
              <Text>Frais de la scolarite</Text>
              <Text>Frais tranche 1</Text>
              <Text>Frais tranche 2</Text>
              <Text>Frais tranche 3</Text>
              </Box>
            </Box> 
          </Box>
        </CardHeader>
      <CardBody>
        <Box>
          <Heading 
            size='sm' 
            w={'50%'}
          >
            <Text 
              bgColor={'#767676'} 
              p='1' 
              color={'white'}
            >
              ABSENCE
            </Text>
          </Heading>
          <Box>
            <Text color={'#AB9442'}>
              <Text 
                as='b'
                color='#AB9442'
              >
                Absente le : 
              </Text>
                20.12.2022 (Maladie)
            </Text>
          </Box>
        </Box>
        <Box mt={'5'}>
          <Heading 
            size='sm' 
            w={'50%'}
          >
            <Text 
              bgColor={'#767676'} 
              p='1' 
              color={'white'}
            >
              Transport
            </Text>
          </Heading>
          <Box>
            <Text color={'#AB9442'}>
              <Text 
                as='b' 
                color='#AB9442'
              >
                Transport (dernier paiement) : 
              </Text>
                54.000 (Maladie)
            </Text>
          </Box>
        </Box>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>

 {/* FORMULAIRE initialisation PAIEMENT DE SCOLARITE */}
      <AlertDialog
          isOpen={isOpenns}
          leastDestructiveRef={cancelRef}
          onClose={onClosses}
          size='xl'
        >
          <AlertDialogOverlay>
            <AlertDialogContent  width={"300px"}>
              <Box mt={"20px"}> 
                  <Heading 
                    textAlign="center"
                    size="md"
                  >
                    Initialiser le paiement
                  </Heading>
                  <AlertDialogBody>
                    <Box mt='4'>
                      <FormControl mt="5px">
                        <FormLabel>Montant</FormLabel>
                        <Input
                          type="number"
                          name="montant"
                          // value={montant}
                          // onChange={(event)=> setMontant(event.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                          <FormLabel>Eleve</FormLabel>
                        <Input
                          type="text"
                          name="studentId"
                          value={dataStudentId.findOnestudent.lastname}
                          isDisabled
                        />
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
                      // onClick={() => addTrancheStudent(dataStudentId.findOnestudent.id)}
                    >
                      Initialiser
                    </Button>
                  </Link> 
                </AlertDialogFooter>
              </Box>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* FORMULAIRE DE PAIEMENT DE LA SCOLARITE */}
          <Box
            as="form"
            // onSubmit={PayTrancheSchoolFees}
            // onSubmit={PayTrancheSchoolFees(handleSubmit)}
          > 
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    size='xl'
                  >
                  <AlertDialogOverlay>
                    <AlertDialogContent  >
                        <AlertDialogHeader 
                          fontSize='sm' 
                          fontWeight='base' 
                          mt='0'
                        >
                        <Box  
                          bg={"colors.secondary"} 
                          borderBottomRightRadius={10} 
                          borderBottomLeftRadius={10}
                        >
                          <Heading 
                            as='h4' 
                            textAlign={'center'} 
                            fontSize={['15px','20px','26px']} 
                            p='2' 
                          >
                              Groupe Scolaire Bilingue Awono Bilongue
                          </Heading>
                        </Box>
                        </AlertDialogHeader>
                      <AlertDialogBody>
                        <Box mt='4'>
                          {/* BOUTON D'INITIALISATION DE LA PENSION */}
                            {/* <Box display="flex"> 
                              <Text 
                                mb={5}
                                size="md"
                                color = "colors.quinzaine"
                              >
                                Initialisez le paiement
                              </Text>
                              <Icon 
                                as={IoIosAdd} 
                                boxSize="30px"
                                color={"colors.greencolor"}
                                rounded="full"
                                ml={["5px", "5px", "5px" ]}
                                mr={["5px"]}
                                _hover={{background:"colors.bluecolor"}}
                                onClick={onOpenns}
                              />
                              </Box>  */}
                            <Flex 
                              gap={5} 
                              flexWrap={['wrap','wrap','nowrap']} 
                              align='end'  
                              ml={"240px"}
                              mb="10px"
                            >
                                <Text>Pension total payée:</Text>
                                <Text 
                                  type={'text'} 
                                >
                                  {dataTrancheStudentBySudentId?.getTrancheStudentByStudent.montant} FCFA
                              </Text>
                            </Flex>
                          {/* <FormControl>
                            <FormLabel>
                              Motif
                            </FormLabel>
                              <Select
                                name="trancheId"
                                value={trancheId}
                                onChange={(event) => setTrancheId(event.target.value)}
                                placeholder={"Motif"}
                              >
                                {
                                  dataTranchePension && (
                                    dataTranchePension.findAlltranche.map((tranche, index) =>(
                                      <option value={tranche?.id} key={index}>
                                          {tranche.name}
                                      </option>
                                    ))
                                  )
                                }
                              </Select>
                          </FormControl> */}
                          <Box> 
                              {/* <Controller
                               control={control}
                                name="trancheId"
                                {...register("trancheId")}
                                render = {({field: {...props}}) => {
                                  return(  */}
                                <FormControl>
                                  <FormLabel>
                                    Motif
                                  </FormLabel>
                                    <Selects
                                      isMulti
                                      name={"selectedTranches"}
                                      value={selectedTranches}
                                      // onChange={(...e)=>{
                                      //   // console.log(e);
                                      //   // console.log(e[0]);
                                      //    setSelectedTranches((prev)=>[...prev,e[0]]);
                                      //   // console.log(selectedTranches);
                                      //   }
                                      //   }
                                      onChange={setSelectedTranches}
                                      options={tranches}
                                      placeholder={"Motif"}
                                      // {...props}
                                      trancheMiseAJour
                                      // error={error}
                                      // value={trancheId} 
                                      // onChange={(value) => handleTrancheSelect(value)}
                                    >
                                      {console.log(selectedTranches)}
                                    {/* {console.log(trancheId)} */}
                                    </Selects>
                                    {/* {errors.trancheId && <Text>{errors.trancheId.message}</Text>} */}
                                </FormControl>
                                 {/* )}} */}
                              {/* /> */}
                          </Box>
                        </Box>
                        <Box mt='4'>
                          <Flex 
                            gap={5} 
                            flexWrap={['wrap','wrap','nowrap']} 
                            align='end'
                          >
                            
                              {/* <FormLabel>Montant attendu</FormLabel>
                                <Input 
                                  type={'text'} 
                                  disabled='disabled' 
                                  placeholder='0000000' 
                                  color='gray'
                                />
                              </FormControl> */}
                              {/* <FormControl>
                                <FormLabel>Montant percu</FormLabel>
                                <Input 
                                  minValue="20000"
                                  maxValue="80000g"
                                  type={'number'} 
                                  name="montant"
                                  value={montant}
                                  onChange={(event) => setMontant(event.target.value)}
                                />
                              </FormControl> */}
                              {/* <Controller
                                name="montant"
                                control={control}
                                {...register("montant")}
                                render = {({field: { ...props}})=> { 
                                  return ( */}
                                <FormControl> 
                                  <FormLabel>Montant percu</FormLabel>  
                                  <NumberInput
                                   type="number"
                                    name="montant"
                                    isRequired
                                    min={500} 
                                    // value={montant}
                                    defaultValue={2000}
                                    // onChange={(e)=>setMontant(e.target.value)}
                                    max={150000}
                                    // error={error}
                                  //  {...props}
                                  //  defaultValues={defaultValues.montant}
                                  // defaultValue="10000"
                                    //  {...register(montant)}
                                    //  ref={register}
                                    //  value={montant}
                                     onChange={(value) => setMontant(parseInt(value))}
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                {/* {console.log(montant)} */}
                                </FormControl> 
                                {/* )}}
                              /> */}
                                 {/* <Selects
                                 mt="10px"
                                    isMulti
                                    options={[
                                      { value: "option1", label: "Option 1" },
                                      { value: "option2", label: "Option 2" },
                                      { value: "option3", label: "Option 3", isDisabled: true },
                                    ]}
                                  /> */}
                          </Flex>
                              {/* {errors.montant?.message && <Text>{errors.montant.message}</Text>} */}
                      {/* min max default value */}
                        </Box>
                        <Box mt="10px"> 
                        {/* <Controller 
                        control={control}
                          name="studentId"
                          {...register("studentId", {register:true})}
                          render={({field:{...props}}) =>{ 
                          return( */}
                            <FormControl>
                              <FormLabel> Eleve</FormLabel>
                              <Input 
                                type={'text'} 
                                // {...props}
                                // error={error}
                                // name="id"
                                // {...register("id", { required: true })}
                                // value={studentId}
                                // onChange={(event) => setStudenId(event.target.value)}
                                value={dataStudentId?.findOnestudent.firstname}
                              />
                              {/* {console.log(dataStudentId?.findOnestudent.id)} */}
                            </FormControl>
                          {/* )}}
                          /> */}
                        </Box>
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button 
                          ref={cancelRef} 
                          onClick={onClose} 
                          colorScheme='red' 
                        >
                          annuler
                        </Button>
                        <Link href={'#'}>
                          <Button 
                            colorScheme='green'  
                            ml={3}
                            // isLoading={isSubmitting}
                            // onClick={PayTrancheSchoolFees}
                              // (dataStudentId?.findOnestudent.id)
                            onClick={addAvanceTranche}
                              // (dataTrancheStudentBySudentId?.getTrancheStudentByStudent.id)
                          >
                            payer
                          </Button>
                        </Link> 
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Box>
</SimpleGrid>
)} 
      </Box>
    </DefaultLayout>
  );
};

export default DetailComponent;





