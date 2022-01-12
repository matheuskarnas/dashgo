import { Flex, Box, Avatar, Text } from '@chakra-ui/react'

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex aling='center'>
            {showProfileData && (
                <Box mr='4' textAlign='right' >
                    <Text>Matheus Karnas</Text>
                    <Text color='gray.300' fontSize='small'>
                        matheuskarnas1@gmail.com
                    </Text>
                </Box>
            )}



            <Avatar size='md' name='Matheus Karnas' src='http://github.com/diego3g.png' />

        </Flex>
    )
}