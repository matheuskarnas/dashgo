
import { Box, Flex, Heading, Icon, Button, Tr, Th, Td, Table, Thead, Checkbox, Tbody, Text, useBreakpointValue, Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination/index'
import { Sidebar } from '../../components/Sidebar/Index'
import { useUsers } from '../../services/hooks/useUsers'

export default function UserList() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isFetching, error } = useUsers(page)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Box>
            <Header />
            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6' >
                <Sidebar />

                <Box flex='1' borderRadius={8} bg="gray.800" p="8" >
                    <Flex mb='8' justify="space-between" aling='center' >
                        <Heading size='lg' fontWeight='normal' >
                            Usuários
                            {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
                        </Heading>

                        <Link href='/users/create' passHref>
                            <Button as='a' size='sm' fontSize='sm' colorScheme='pink' leftIcon={<Icon as={RiAddLine} fontSize='20' />}>
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify='center' >
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex>
                            <Text>
                                Erro ao carregar os dados
                            </Text>

                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme='whiteAlpha' >
                                <Thead>
                                    <Tr >
                                        <Th px={['4', '4', '6']} color='gray.300' w='8' >
                                            <Checkbox colorScheme='pink' />
                                        </Th>
                                        <Th>Usuários</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.users.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={['4', '4', '6']} >
                                                    <Checkbox colorScheme='pink' />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Text fontWeight='bold'>{user.name}</Text>
                                                        <Text fontSize='sm' color='gray.300' >{user.email}</Text>
                                                    </Box>
                                                </Td>

                                                {isWideVersion && <Td>{user.createdAt}</Td>}
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}