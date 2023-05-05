import { Box, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Heading, 
    Text,
    Center,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
    Flex,
    FormControl,
    FormLabel,
    Hide,
    Show,
    Stack,
    Divider,
    Image,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';
// import { useTranslation} from 'next-i18next';
import {CiSearch} from 'react-icons/ci'
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { useQuery, useMutation } from "@apollo/client"
import { GET_STUDENT_STATISTICS_ANGLOPHONE_SECTION } from '../../graphql/Queries';
import { useEffect } from 'react';
const SuiviPaimentFraisScolarite = () => {

    // const {t} = useTranslation();

    const {data:dataStudentStatisticsAnglophoneSection} = useQuery( GET_STUDENT_STATISTICS_ANGLOPHONE_SECTION)
    
    useEffect(() => {
        console.log(dataStudentStatisticsAnglophoneSection);
    })
    return (
        <DefaultLayout> 
            <Center>
                    <Box 
                        //  gap={6}
                        // mt={'10'} 
                        // display={{md:'flex'}}
                        // mb={'20px'}
                        border={'1px'}
                        mt={'80px'}
                        width={'1200px'}
                        ml={'45px'}
                        bg={"white"}
                    >
                        <Box mb={'2'} borderBottom={'1px'}>
                            <Heading textAlign={'center'}  fontSize={['2xl', '2xl', '2xl']}>
                                GROUPE SCOLAIRE BILINGUE AWONO BILONGUE
                            </Heading>
                        </Box>
                        <Box display={'flex'} ml={'50px'} > 
                            <Box   mt={'30px'}>
                                <Heading textAlign={'center'} fontSize={['sm', 'sm', 'sm']} >
                                    TABLEAU DE SUIVI GENERAL  DU PAIEMENT DES FRAIS DE SCOLARITE: CLASSE: CM2/ SECTION ANGLOPHONE         
                                </Heading>
                            </Box>
                            <Box mt={'30px'} ml={'40px'}>
                                <Text textAlign={'center'} fontSize={['sm', 'sm', 'sm']}>
                                    Date:-------/-------/------
                                </Text>  
                            </Box>
                        </Box>
                        <Box borderTop={'1px'}> 
                            <TableContainer >
                                <Table size='sm'>
                                    <Thead borderBottom={"1px"}>
                                        <Tr borderBottom={"1px"}>
                                            <Th>No</Th>
                                            <Th>Nom et prenom</Th>
                                            <Th>Matricule</Th>
                                            <Th>Montant attendu</Th>
                                            <Th>montant en caisse</Th>
                                            <Th>taux d'encaissement</Th>
                                            <Th>reste a recouvrir</Th>
                                            <Th>taux rar</Th>
                                        </Tr>
                                    </Thead>
                                    {dataStudentStatisticsAnglophoneSection && 
                                    <Tbody>
                                        {dataStudentStatisticsAnglophoneSection?.getStudentStatisticsAnglophone
                                        .map((anglophoneStudent, index) => ( 
                                        <Tr borderBottom={"1px"} key={index}>
                                            <Td  borderBottom={"1px"}>1</Td>
                                            <Td borderBottom={"1px"}>{anglophoneStudent.name}</Td>
                                            <Td >{anglophoneStudent.matricle}</Td>
                                            <Td>{anglophoneStudent.amountExpected}</Td>
                                            <Td>{anglophoneStudent.amountPaid}</Td>
                                            <Td>{anglophoneStudent.collectionRate}%</Td>
                                            <Td>{anglophoneStudent.restToPay}</Td>
                                            <Td>{anglophoneStudent.rateArrears}%</Td>
                                        </Tr> 
                                    ))}                                    
                                    </Tbody>
                                    }
                                    <Tfoot>
                                        <Tr>
                                            <Th>Total</Th>
                                        </Tr>
                                    
                                    </Tfoot>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
            </Center>
        </DefaultLayout>
    );
}

export default SuiviPaimentFraisScolarite;
