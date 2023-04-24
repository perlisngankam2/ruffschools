
import {
    Box, Button, Center, Divider, Flex, Heading, Input, Text 
} from "@chakra-ui/react";
import PaySlipBottom from "../../components/atoms/PaySlipBottom";
import PaySlipMiddle from "../../components/atoms/PaySlipMiddle";
import PaySlipFolderSalaryBox from "../../components/atoms/PaySlipFolderSalaryBox";
import PaySlipLogoBox from "../../components/atoms/PaySlipLogoBox";
import PaySlipInformationEmployeeBox from "../../components/atoms/PaySlipInformationEmployeeBox";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PERSONNEL_BY_ID,
  GET_ALL_SALAIRE_BY_ID,
   GET_Category_Personnel_BY_ID, GET_Category_Personnel_ID} from "../../graphql/Queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CREATE_SALAIRE } from "../../graphql/Mutation";
import { useToast } from "@chakra-ui/react";
import Routes from "../../modules/routes";
import Link from "next/link";

const PaySlip = () => {

  const router = useRouter();
  const toast = useToast();



  //information du personnel par son ID

    const {data:dataPersonnelId} = useQuery(GET_ALL_PERSONNEL_BY_ID,
      {
        variables:{ id: router.query.id}
      })


  // recupere l'ID de la categorie associee a un personnel

    const {data:dataCategorieId} = useQuery(GET_Category_Personnel_ID,
     {
        variables:{ personnelid: dataPersonnelId?.findOnePersonnel.id}
     })

// information de la categorie associee au personnel

    const {data:dataCategorie} = useQuery(GET_Category_Personnel_BY_ID,
    {
        variables:{ id: dataCategorieId?.findCategoriepersonnelbypersonnel}
    })


      const {data:dataSalaireId} = useQuery(GET_ALL_SALAIRE_BY_ID,
  {
    variables:{ personnelid: dataPersonnelId?.findOnePersonnel.id}
  });


  const personnelId = dataPersonnelId?.findOnePersonnel.id ;
  const montant = dataCategorie?.findOneCategoriepersonnel.montant;

  const [moisPaie, setMoisPaie] = useState("");
  const [jourPaie , setJourPaie] = useState("");
  const [createSalaire] = useMutation(CREATE_SALAIRE);

  
    const moisPayes = []
  const loadMoisPayes = () => {
    dataSalaireId?.getsalairebypersonnel.map((item) => { 
            moisPayes.push(
              {
                value: item?.moisPaie.toLowerCase()

              }
            )
          })

  }
  console.log(dataSalaireId)
  console.log(moisPayes)
  console.log(moisPayes.includes(moisPaie.toLowerCase()))
 console.log(montant)


  const handleMoisPaieChange = (event) => {

    const selectedMonth = event.target.value;

      console.log(!moisPayes.includes(selectedMonth))

    if (!moisPayes.includes(selectedMonth)) {
      setMoisPaie(selectedMonth);
    }
  };

// const linkPersonnelPaySlip = () =>{
//   return (<Link></Link>)
// }
  const HandleClick = async (event) => {
    event.preventDefault();
    const salaireData = await createSalaire({
          variables:{
          input: { 
            personnelId: personnelId,
            montant: parseInt(montant),
            moisPaie: moisPaie, 
            jourPaie: jourPaie
          }
        }
      })
      // router.push({
      //   pathname: Routes.Bulletin?.path || '',
      //   query: {id: router.query.id}
      // })

    console.log(salaireData)

    toast({
      title: "Succès.",
      description: "Ce personnel a été payé .",
      status: "success",
      duration: 3000,
      isClosable: true,
    });


        setMoisPaie("");
  }

    useEffect(() =>{
      loadMoisPayes()
      console.log(dataPersonnelId?.findOnePersonnel)

    })
// if (loading) return <Text>Chargement en cour...</Text>

    return ( 

            <DefaultLayout>
      <Box 
        pt="70px" 
        w="100%" 
        bg={"#f6f7fb"}
      >

        <Heading 
          p="1em" 
          textAlign="center" 
          bg='#eb808a' 
          bgClip='text'
          fontSize={'30px'}
         >
            Formulaire de paie de salaire
          </Heading>
          
        <Flex 
          bg='#5755c1' 
          width='1000px' 
          h='80px' 
          margin="0 auto" 
          pb='20px'
        > 
        <Flex 
          p="1.5em" 
          textAlign="center" 
          ml='20px' 
          gap={6} 
          margin="0 auto" 
        >
          <Flex>
            <Text 
              color='#9490c9' 
              fontWeight={'bold'}
            >
              Noms & prénoms de l'employé :
            </Text>
            <Text color='white'>
              {dataPersonnelId?.findOnePersonnel.firstName +' '+ dataPersonnelId?.findOnePersonnel.lastName}
            </Text>
          </Flex>
          <Flex>
            <Text 
              color='#9490c9' 
              fontWeight={'bold'}
            >Fonction :
            </Text>
            <Text color='white'>
              {dataPersonnelId?.findOnePersonnel.fonction}
            </Text>
          </Flex>
        </Flex>
        </Flex>

{/* //informaton salaire et mois */}
      <Center>
        <Flex 
          mt="20px"
          gap={7}
        > 
         <Box width={'340px'} gap={7} as={"form"}
            onSubmit={HandleClick}
         >
          <Text fontSize='sm'> Salaire Mois</Text>
              <Input
                    placeholder="nom prime"
                    bg='white'
                    type="month"
                    name="dateOfPrime"
                    rounded={2}
                    onChange={handleMoisPaieChange}
                    isDisabled={moisPayes.includes(moisPaie)}
                    value={moisPaie}
                    
                  />
                  {console.log(moisPaie)}
                  
                      <Input
                    placeholder="nom prime"
                    bg='white'
                    type="date"
                    rounded={2}
                    name="dateOfPrime"
                    mt={'8px'}
                    onChange={(event) => setJourPaie(event.target.value)}
                    value={jourPaie}
                    
                  />
                  
                   {console.log(jourPaie)}
                  </Box>
        </Flex>
      </Center>
       <Box 
        mx='100px' 
        pb={'20px'} 
        mt='20px'
       >
          <Divider />
        </Box>
             <Center>
          <Button 
            disabled={!moisPaie} 
            type="submit" 
            color='white' 
            bg='#eb808a' 
            variant='solid'
            mx='auto' 
            my='auto'
          >
            Soumettre  
           </Button>
        </Center>
      </Box>

    </DefaultLayout>
     );
}
 
export default PaySlip; 

//   voici ma parselle de code

// const moisPayes = [];
//   const [personnelId , setPersonnelId] = useState("");
//   const montant = dataCategorie?.findOneCategoriepersonnel.montant;
//   const [moisPaie, setMoisPaie] = useState("");
//   const [jourPaie , setJourPaie] = useState("");
//   const [createSalaire] = useMutation(CREATE_SALAIRE);
  


//   const handleMoisPaieChange = (event) => {
//     const selectedMonth = event.target.value;
//     if (!moisPayes.includes(selectedMonth)) {
//       setMoisPaie(selectedMonth);
//     }
//   };