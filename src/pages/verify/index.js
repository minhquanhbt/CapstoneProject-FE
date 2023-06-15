import { Box, Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { accepted } from '../../api/auth';
import {notification} from 'antd';

export default function VerifyEmail() {
  const params = useParams();
  const [verify, setVerify] = useState("Verifying Email...");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(params.token)
    accepted({
          token: params.token,
        })
      .then((res) => {
        setVerify("Page redirecting...");
        navigate("/");
      }).catch((error) => {
        notification.error({
            message: 'Link này đã được kích hoạt hoặc bị lỗi',
            duration: 3,
        })
    });
  }, []);
  return (
    <Flex w="100%" h="100vh" align="center" justifyContent="center">
      <Box>
        <Heading>{verify}</Heading>
        <Center mt={5}>
          <Spinner size="lg" />
        </Center>
      </Box>
    </Flex>
  );
}