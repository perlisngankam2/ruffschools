import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  Flex,
  ButtonGroup,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  // Link as Links,
  Grid,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import { GiTakeMyMoney, GiPayMoney } from "react-icons/gi";
import Routes from "../../modules/routes";
import { FiEdit, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io";
import DefaultLayout from "../../components/layouts/DefaultLayout";
// import PaySlip from "./PaySlip";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERSONNELS } from "../../graphql/Queries";
import ReactPaginate from "react-paginate";
import { MdDelete } from "react-icons/md";

const Payment = () => {
  // const [searchName, setSearchName] = useState("");

  const {data:dataPersonnel, loading, error} = useQuery(GET_ALL_PERSONNELS)
  const [personnel, setPersonnel] = useState([]);
  const [ filteredData, setFilteredData]=useState([]);
  const [ searchName, setSearchName]=useState("")
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;
 const pageCount = Math.ceil(dataPersonnel?.findAllpersonnel.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

  const handleChange = (e) => {
    setSearchName(e.target.value);
    // const newFilter =   dataPersonnel.findAllpersonnel
    //           .filter((personnel) =>{
    //           return  (personnel.firstName.toLowerCase().includes (searchName.toLowerCase()) || personnel.lastName.toLowerCase().includes (searchName.toLowerCase()) || personnel.fonction.toLowerCase().includes (searchName.toLowerCase()))
              
    //         } );
    // if (searchName === ""){
    //   setFilteredData([]);
    // }else {
    //     setFilteredData(newFilter);
    // }
            
  };
  return (
    <DefaultLayout>
      <Box 
        p={"10px"} 
        w="full" 
        minH="100vh" 
        bgColor="colors.tertiary"
      >
        <Box pt="70px" w="100%">
          <Heading 
            p="1em" 
            textAlign="center" 
            bgGradient='linear(to-r, teal.500, green.500)' 
            bgClip='text' fontSize={'30px'}
          >
            gestion de la paie de salaire
          </Heading>
        </Box>
        <Center>
          <Box pb='5px'>
             <InputGroup width="300px">
              {filteredData.length === 0 ?
            <InputRightElement
              children={<Icon as={FiSearch} />}
              cursor="pointer"
            /> : 
            <InputRightElement
              children={<Icon as={IoClose} />}
              cursor="pointer"
            />}
            <Input
              placeholder="Rechercher un employé"
              variant="flushed"
              onChange={handleChange}
            />
          </InputGroup>
          </Box>
   
        </Center>
        
               {/* {filteredData.length !=0 &&(
                 <Box py='9px' w='290px' bg={'white'} boxShadow="md" borderRadius="7px" overflow={"hidden"} overflowY='auto' placeItems={'center'} margin="0 auto">
           {filteredData.map((personnel, index) => (
              <Grid key={index} marginLeft='10px' >
              <Link  
                  href= {{
                      pathname: Routes.PaymentDetails?.path || '',
                      query: {id: personnel.id}
                  }}
              >
                  <Text 
                    width={'200px'}  
                    display={'flex'} 
                    alignItems='center' 
                    color='black' 
                    textDecoration="none"
                    _hover={{background:"lightgrey", color:'white'}}
                >
                  {personnel.firstName} {personnel.lastName} - {personnel.fonction.toLowerCase()}
                </Text>
              </Link>

              </Grid>
          ))} </Box>)} */}
          
        {/* <PaySlip />  */}
          <Box mt={10} pb='5px'>
            <TableContainer
              border={"1px"} 
              rounded={"md"}
              >
                <Table 
                    variant='striped' 
                    colorScheme={"white"}
                    bg={"white"}
                  >
                    <Thead background="colors.secondary">
                      <Tr >
                        <Th>Nom</Th>
                        <Th>Prenom</Th>
                        <Th>Fonction</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    {dataPersonnel && ( 
                    <Tbody>
                      { dataPersonnel.findAllpersonnel
                      .filter((personnel) => {
                         if (searchName === ""){
                            return personnel;
                          } else if (personnel.firstName.toLowerCase().includes (searchName.toLowerCase()) || personnel.lastName.toLowerCase().includes (searchName.toLowerCase()) || personnel.fonction.toLowerCase().includes (searchName.toLowerCase()))
                              return personnel; 
                          

                      })
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      
                      .map((personnel, index) => ( 
                        <Tr key={index}>
                          
                            <Td p={3} pl={6}>{personnel.firstName}</Td>
                            <Td p={3} pl={6}>{personnel.lastName}</Td>
                            <Td p={3} pl={6}>{personnel.fonction}</Td>
                             <Td p={0} >
                            <ButtonGroup 
                              size='sm' 
                              isAttached 
                              variant='link' 
                              colorScheme={'teal'}
                              >
                                <Button>
                                  
                                  <Link 
                                    href= {{
                      pathname: Routes.PaymentDetails?.path || '',
                      query: {id: personnel.id}
                  }}
                                  >
                                    <Icon as={GiPayMoney}/>Payer</Link>
                                </Button>
                              </ButtonGroup> 
                            </Td>
                        </Tr>
                     ))}
                    </Tbody>
                  )}
                </Table>
            </TableContainer>
        </Box>
 <ReactPaginate 
      previousLabel={"<<"}
      nextLabel={">>"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"paginationBttns"}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}
    />
      </Box>
    </DefaultLayout>
  );
};

export default Payment;
