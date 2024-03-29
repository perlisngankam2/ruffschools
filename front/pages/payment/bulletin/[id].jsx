
import {
    Box,
    Text,
    Center,
    Heading,
    Flex,
    Image
} from "@chakra-ui/react";
import PaySlipBottom from "../../../components/atoms/PaySlipBottom";
import PaySlipMiddle from "../../../components/atoms/PaySlipMiddle";
import PaySlipFolderSalaryBox from "../../../components/atoms/PaySlipFolderSalaryBox";
import PaySlipLogoBox from "../../../components/atoms/PaySlipLogoBox";
import PaySlipInformationEmployeeBox from "../../../components/atoms/PaySlipInformationEmployeeBox";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { GET_ALL_PERSONNEL_BY_ID,GET_PRIME, GET_ALL_RETENUE, GET_ALL_RETENUE_BY_ID, GET_ALL_PRIME_BY_ID ,GET_ALL_SALAIRE_BY_ID, GET_SALARY_NET,GET_Category_Personnel_BY_ID, GET_Category_Personnel_ID } from "../../../graphql/Queries";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

const Bulletin = () => {

  const router = useRouter();

 

     const {data:dataPersonnelId, loading, error} = useQuery(GET_ALL_PERSONNEL_BY_ID,
      {
        variables:{ id: router.query.id}
      });


      const {data:dataSalaireId} = useQuery(GET_ALL_SALAIRE_BY_ID,
      {
        variables:{ personnelid: router.query.id}
      });

      const {data:dataSalaireNet} = useQuery(GET_SALARY_NET,
      {
        variables:{ personnelid: router.query.id}
      });


        // recupere l'ID de la categorie associee a un personnel

    const {data:dataCategorieId} = useQuery(GET_Category_Personnel_ID,
     {
        variables:{ personnelid: router.query.id}
     })

// information de la categorie associee au personnel

    const {data:dataCategorie} = useQuery(GET_Category_Personnel_BY_ID,
    {
        variables:{ id: dataCategorieId?.findCategoriepersonnelbypersonnel}
    })

  //prime et retenues
 const {data:dataRetenue} = useQuery(GET_ALL_RETENUE_BY_ID,
    {
        variables:{ personnelid: router.query.id}
    })

   const {data:dataPrime} = useQuery(GET_ALL_PRIME_BY_ID,
    {
        variables:{ personnelid: router.query.id}
    })


    ////aeffacer

     const {data:dataPrimee} = useQuery(GET_PRIME)
  const {data:dataRetenuee} = useQuery(GET_ALL_RETENUE)


       const dernierIndice = dataSalaireNet?.PersonnelNetSalary.length - 1
       const dernierElement = dataSalaireNet?.PersonnelNetSalary[dernierIndice];

       //
       const dernierIndiceSalaire = dataSalaireId?.getsalairebypersonnel.length - 1
       const dernierElementSalaire = dataSalaireId?.getsalairebypersonnel[dernierIndice];


console.log(dataSalaireNet?.PersonnelNetSalary)
console.log(dataSalaireId?.getsalairebypersonnel)

console.log("dataRetenue")
console.log(dataRetenue?.findretenupersonnelbypersonnel)
console.log(dataPrime)



function nombreEnLettres(montant) {
  const chiffres = [
    '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
    'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
  ];

  const dizaines = [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix',
    'quatre-vingt', 'quatre-vingt-dix'
  ];

  const unite = montant % 10;
  const dizaine = Math.floor(montant / 10) % 10;
  const centaine = Math.floor(montant / 100) % 10;
  const millier = Math.floor(montant / 1000) % 1000;

  let resultat = '';

  if (millier > 0) {
    resultat += nombreEnLettres(millier) + ' mille ';
  }

  if (centaine > 0) {
    resultat += chiffres[centaine] + ' cent ';
  }

  if (dizaine === 1 && unite > 0) {
    resultat += chiffres[10 + unite] + ' ';
  } else if (dizaine > 1 || (dizaine === 1 && unite === 0)) {
    resultat += dizaines[dizaine] + ' ';
  }

  if (dizaine !== 1 && unite > 0) {
    resultat += chiffres[unite] + ' ';
  }

  return resultat.trim();
}

const lettre =nombreEnLettres(dernierElement)
console.log(lettre)




    if (loading) return <Text>Chargement en cour...</Text>
    if (error) return <Text>Une erreur s'est produite!</Text>

    
    return ( 
      <>
      {!loading &&

      <DefaultLayout>
            <Box p="3" pt="70px" w="100%" background="colors.tertiary">
        <Center >
          <Box borderWidth='1px' 
                    bg={'white'}
                    borderColor='black' 
                    w='1000px'
                    >
            <Box px='20px' > 
                  <Flex gap='350px'>
                    <Box><Image  src="../../logo.png" w='150px' /></Box>
                    <Box mt='30px'>
                      <Heading > BULLETIN DE PAIE</Heading>  
                      <Text mt='10px' textAlign={"center"} >Mois de paie: {dernierElementSalaire?.moisPaie}</Text>
                      <Text textAlign={"center"} >Paiement, le {dernierElementSalaire?.jourPaie}</Text>
                    </Box>
                    


                  </Flex>
                  <Flex gap='280px' mt='20px'>

              <Box ml='17px' >

                 <Flex mt='10px'>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Matricule:</Text>
                    <Text ml={['10px', '10px', '10px']} > XXXXXXXXXXX</Text>
                </Flex>
                <Flex>
                    <Text ml={['10px', '10px', '10px']}  fontWeight='bold'>Categorie:</Text>
                    <Text ml={['10px', '10px', '10px']}> {dataCategorie?.findOneCategoriepersonnel.nom.toUpperCase()}</Text>
                </Flex>

                <Flex>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Fonction:</Text>
                    <Text ml={['10px', '10px', '10px']} >{dataPersonnelId?.findOnePersonnel.fonction.toUpperCase()} </Text>
                </Flex>
                <Flex>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Status:</Text>
                    <Text ml={['10px', '10px', '10px']} >{dataPersonnelId?.findOnePersonnel.status} </Text>
                </Flex>
                 <Flex>
                    <Text ml={['10px', '10px', '10px']} fontWeight='bold'>Anciennete:</Text>
                    <Text ml={['10px', '10px', '10px']} > {dataPersonnelId?.findOnePersonnel.dateOfStartWork}</Text>
                </Flex>
            </Box>

            <Box  w='300px' >
                <Text mt='30px' textAlign={'center'} fontWeight='bold'>{dataPersonnelId?.findOnePersonnel.firstName.toUpperCase()+' '+dataPersonnelId?.findOnePersonnel.lastName.toUpperCase()} </Text>
                <Text textAlign={'center'}  fontWeight='bold'>{dataPersonnelId?.findOnePersonnel.phoneNumber} </Text>

            </Box>
            
            
            </Flex>
            <Center mb='10px'>
              <Box>
              <Box mt='20px' >
                <Flex w='900px'>
                    <Box w='300px' borderLeft={'1px'}   py='6px' background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Libelle</Heading></Box>
                    <Box  w='180px'  borderLeft={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Base</Heading></Box>
                    <Box w='100px'  borderLeft={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Tx/Mnt</Heading></Box>
                    <Box w='160px'  borderLeft={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading color='white' fontSize={'md'} textAlign={"center"}>Gains</Heading></Box>
                    <Box  w='160px' borderLeft={'1px'} borderRight={'1px'} py='6px' borderLeftColor={'white'} background="colors.primary"><Heading  color='white' fontSize={'md'}textAlign={"center"}>Retenues</Heading></Box>

                </Flex>
                <Flex w='900px'>
                    <Box w='300px' borderLeft={'1px'} py='6px' borderBottom={'1px'} >
                      <Text ml='6px' >Salaire</Text>
                        <Box mt='20px' ml='6px'>
                          <Heading fontSize={'md'} fontWeight={'bold'} color='black'>PRIMES SALARIALES</Heading>
                          { 
                      dataPrimee && (
                        dataPrimee?.findAllprime.map((prime) => (
                            <Text ml='20px'>
                              {prime.nom}
                            </Text>
                        )))}
                        </Box>
                         <Box mt='20px' ml='6px'>
                          <Heading fontSize={'md'} fontWeight={'bold'} color='black'>RETENUES SALARIALES</Heading>
                          { 
                      dataRetenuee && (
                        dataRetenuee?.findAllretenusalarial.map((retenue) => (
                            <Text ml='20px'>
                              {retenue.nom}
                            </Text>
                        )))}
                        </Box>
                           <Box mt='20px' ml='6px'>
                          <Heading fontSize={'md'} fontWeight={'bold'} color='black'>RETRAITE</Heading>
                          <Text ml='20px'></Text>
                        </Box>
                          <Box mt='20px' ml='6px'>
                          <Heading fontSize={'md'} fontWeight={'bold'} color='black'>TOTAL RETENUES</Heading>
                        </Box>
                          <Box mt='20px' ml='6px'>
                          <Heading fontSize={'md'} fontWeight={'bold'} color='black'>TOTAL PRIMES</Heading>
                        </Box>
                    </Box>




                    <Box  w='180px'  borderLeft={'1px'} py='6px' borderBottom={'1px'} background='green.50' >
                      <Text textAlign={"right"} mr='6px'>{dataCategorie?.findOneCategoriepersonnel.montant}</Text>
                     < Box mt='20px'>
                          <Heading fontSize={'md'} mb='20px'></Heading>
                               { 
                      dataPrimee && <Box pt='18px' mr='6px'>
                       { dataPrimee?.findAllprime.map((prime) => (
                            <Text textAlign={"right"}>
                              {prime.montant}
                            </Text>
                            ))}</Box>}
                        </Box>
                        < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                            { 
                      dataRetenuee && <Box pt='18px' mr='6px'>
                       { dataRetenuee?.findAllretenusalarial.map((retenue) => (
                            <Text textAlign={"right"} >
                              {retenue.montant}
                            </Text>
                            ))}</Box>}
                        </Box>
                        {/* < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text>XXXXXXXXXXXX</Text>
                        </Box> */}
                      </Box>
{/* colonnes des taux */}

                    <Box w='100px' borderLeft={'1px'} py='6px' borderBottom={'1px'}  >
                      {/* <Text textAlign={"center"}></Text>
                        < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text></Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text></Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text></Text>
                        </Box> */}
                      </Box>

{/* colonnes des gains */}
                    <Box w='160px'  borderLeft={'1px'} py='6px' borderBottom={'1px'} background='green.50'>
                  
                       < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                            { 
                      dataPrimee && <Box pt='39px' mr='6px'>
                       { dataPrimee?.findAllprime.map((prime) => (
                            <Text textAlign={"right"}>
                              {prime.montant}
                            </Text>
                            ))}</Box>}
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text></Text>
                        </Box>
                        
                      </Box>
{/* colonnes des retenues */}

                    <Box  w='160px' borderLeft={'1px'}  borderRight={'1px'} py='6px' borderBottom={'1px'} >
                      <Text textAlign={"center"}></Text>
                       < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text></Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                          <Text></Text>
                        </Box>
                         < Box mt='20px'>
                          <Heading fontSize={'md'}></Heading>
                           { 
                      dataRetenuee && <Box pt='150px' mr='6px'>
                       { dataRetenuee?.findAllretenusalarial.map((retenue) => (
                            <Text textAlign={"right"}>
                              {retenue.montant}
                            </Text>
                            ))}</Box>}
                        </Box>
                      </Box>

                </Flex>
                                      

              </Box>
              <Flex w='900px' border={'1px'} mt='20px'>
                <Box py='6px' w='450px' borderRight={'1px'} background="colors.primary"color='white'><Text>NET A PAYER</Text></Box>
                <Box py='6px' w='450px' ><Text textAlign={'right'} mr='20px' fontSize={'18px'} fontWeight={'bold'}>{dernierElement} FCFA</Text></Box>
              </Flex>
                <Box 
                        p={'10px'}>
                        <Text textAlign={'center'}>
                            Montant en lettre du salaire net :<Text fontWeight={'bold'}>{lettre.toUpperCase()} FRANC CFA</Text>
                        </Text>
                    </Box>
              
              </Box>
              

            </Center>



            </Box>
          



          </Box>
     {/* <Center >
           <Box  borderWidth='1px' 
                    bg={'white'}
                    borderColor='black' 
                    px='20px' >

                <Box textAlign={'center'} mt={'4%'}>
                    <Heading>BULLETIN DE PAIE</Heading>
                    <Text>Du 23/07/2023 au 23/08/2023</Text>
                </Box>
                <Box
                    gap={6}
                    mt={'10'}
                    display={{ md: 'flex' }}
                    mb={'20px'}
                >
                   <PaySlipLogoBox />

                    <Box>
                        <PaySlipFolderSalaryBox name1='DOSSIER/SALAIRE' name2='EMPLOI' name3='xxxxxxxx' name4='xxxxxxx' />
                        <PaySlipFolderSalaryBox name1='MAT.CNPS' name2='CLASSIFICATION' name3='xxxxxxxx' name4='xxxxxxx' />
                        <PaySlipFolderSalaryBox name1="Date d'entrée" name2='Date de sortie' name3='xxxxxxxx' name4='xxxxxxx' />

                        <PaySlipInformationEmployeeBox 
                        id={dataPersonnelId?.findOnePersonnel.id} 
                        firstName={dataPersonnelId?.findOnePersonnel.firstName}
                        lastName={dataPersonnelId?.findOnePersonnel.lastName}
                        fonction={dataPersonnelId?.findOnePersonnel.fonction}
                        status={dataPersonnelId?.findOnePersonnel.status}
                        />
                    </Box>
                </Box>
                <PaySlipMiddle />
                <PaySlipBottom montant ={dernierElement } periode={dernierElementSalaire.moisPaie} date={dernierElementSalaire.jourPaie} montantLettre={lettre} />
            </Box>
        </Center> */}


           </Center>

       
        </Box>

         
        </DefaultLayout>
      
        }</>
         // <DefaultLayout>
        //     <Box p="3" pt="70px" w="100%" background="colors.tertiary">
        // <Center >
        //     <Box  borderWidth='1px' 
        //             bg={'white'}
        //             borderColor='black' 
        //             px='20px' >

        //         <Box textAlign={'center'} mt={'4%'}>
        //             <Heading>BULLETIN DE PAIE</Heading>
        //             <Text>Du 23/07/2023 au 23/08/2023</Text>
        //         </Box>
        //         <Box
        //             gap={6}
        //             mt={'10'}
        //             display={{ md: 'flex' }}
        //             mb={'20px'}
        //         >
        //            <PaySlipLogoBox />

        //             <Box>
        //                 <PaySlipFolderSalaryBox name1='DOSSIER/SALAIRE' name2='EMPLOI' name3='xxxxxxxx' name4='xxxxxxx' />
        //                 <PaySlipFolderSalaryBox name1='MAT.CNPS' name2='CLASSIFICATION' name3='xxxxxxxx' name4='xxxxxxx' />
        //                 <PaySlipFolderSalaryBox name1="Date d'entrée" name2='Date de sortie' name3='xxxxxxxx' name4='xxxxxxx' />

        //                 <PaySlipInformationEmployeeBox 
        //                 id={dataPersonnelId?.findOnePersonnel.id} 
        //                 firstName={dataPersonnelId?.findOnePersonnel.firstName}
        //                 lastName={dataPersonnelId?.findOnePersonnel.lastName}
        //                 fonction={dataPersonnelId?.findOnePersonnel.fonction}
        //                 status={dataPersonnelId?.findOnePersonnel.status}
        //                 />
        //             </Box>
        //         </Box>
        //         <PaySlipMiddle />
        //         <PaySlipBottom montant ={dernierElement } periode={dernierElementSalaire.moisPaie} date={dernierElementSalaire.jourPaie} montantLettre={lettre} />
        //     </Box>
        // </Center>
        //  </Box>
        // </DefaultLayout>
     );
}
 
export default Bulletin;