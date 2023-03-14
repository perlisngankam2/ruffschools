import {
  Flex,
  Heading,
  Stack,
  Box,
  Text,
  Icon,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  SimpleGrid,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import DashboardCard from "../components/atoms/DashboarCard";
import PaymentNumberAlert from "../components/atoms/PaymentNumberAlert";
import LastStudentRegisteredBox from "../components/atoms/LastStudentRegisteredBox";
import TreasuryBox from "../components/atoms/TreasuryBox";
import LatePayment from "../components/atoms/LatePayment";
import { useAuth } from "../contexts/account/Auth/Auth";
import { useAccount } from "../contexts/account/Account";
import { useRouter } from "next/router";
import { HiUsers } from "react-icons/hi";
import { GiGraduateCap, GiReceiveMoney } from "react-icons/gi";
import React, { createContext, useContext, useEffect } from 'react';
import { GET_PERSONNEL_BY_USERID } from "../graphql/queries";
import {useMutation, useQuery } from '@apollo/client';
import { GoBriefcase } from "react-icons/go";
import { GET_ALL_PERSONNELS } from "../graphql/queries";




 const dashboard = () => {

  const {data:dataPersonnel, error} = useQuery(GET_ALL_PERSONNELS)
  const { authToken } = useAuth();
  const router = useRouter();
  const { account } =  useAccount();

  //debug
      console.log(  account?.id );

  const { data: personnelData, called, loading } = useQuery(GET_PERSONNEL_BY_USERID,
    {
    variables:{ userid: account?.id }
  })


    //debug
      console.log(personnelData?.getpersonnelbyaccount);

//   useEffect(() => {
  
//     //debug
//     console.log(authToken);

// //   if (authToken === undefined) {
// //     router.push("/")
    
// //   }
  
// // }, [])



  return (

    <DefaultLayout>
      <Box pt="90px" w="full">
        <Box top="-7" overflow="auto" minH="100vh" mx={6}>
          {account?.role === null ?
          <Heading fontSize="lg" mb={4} color="yellow.500">
            Bienvenue-GSBAB| {personnelData?.getpersonnelbyaccount.fonction}
          </Heading>:

          <Heading fontSize="lg" mb={4} color="yellow.500">
            Bienvenue-GSBAB| {account?.role}
          </Heading>

          }

          <Flex flexDir="row" gap="8" mb="9" flexWrap="wrap">
            <DashboardCard color="red.200" name="Elèves" icon={GiGraduateCap} />
            <DashboardCard color="gray.400" name="Personnel" icon={GoBriefcase} total={dataPersonnel?.findAllpersonnel.length} />
            <DashboardCard color="green.200" name="Classes" icon={GiGraduateCap} />
          </Flex>

          <Flex
            w="full"
            justify="space-between"
            gap="10"
            flexWrap={["wrap", "wrap", "nowrap"]}
          >
            <Flex direction="column" w="75%" gap="5">
              <PaymentNumberAlert />
              <SimpleGrid
                columns={[1, 1, 1, 2]}
                spacing="4"
                p="6"
                textAlign="center"
                rounded="lg"
                color="gray.400"
                borderColor="green.500"
                borderWidth="1px"
                boxShadow="lg"
                py="9"
              >
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
                <LastStudentRegisteredBox />
              </SimpleGrid>
            </Flex>
           

            <Flex flexDir="column" align="center" gap="5">
              <TreasuryBox />
              <LatePayment />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default dashboard;
