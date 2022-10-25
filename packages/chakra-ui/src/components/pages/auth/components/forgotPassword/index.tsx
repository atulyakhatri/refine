import React, { useState } from "react";
import {
    useTranslate,
    useRouterContext,
    useForgotPassword,
    ForgotPasswordFormTypes,
    ForgotPasswordPageProps,
} from "@pankod/refine-core";
import {
    Box,
    BoxProps,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { layoutStyles, cardStyles } from "../styles";
import { FormPropsType } from "../..";

type ForgotPasswordProps = ForgotPasswordPageProps<
    BoxProps,
    BoxProps,
    FormPropsType
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ForgotPasswordFormTypes>();
    const { mutate } = useForgotPassword<ForgotPasswordFormTypes>();

    const content = (
        <Box style={cardStyles} {...contentProps}>
            <Heading mb="8" textAlign="center" size="lg">
                {translate(
                    "pages.forgotPassword.title",
                    "Forgot your password?",
                )}
            </Heading>

            <form
                onSubmit={handleSubmit((data) => mutate(data))}
                {...formProps}
            >
                <FormControl mb="3" isInvalid={!!errors?.email}>
                    <FormLabel>
                        {translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                    </FormLabel>
                    <Input
                        id="title"
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: translate(
                                    "pages.login.errors.validEmail",
                                    "Invalid email address",
                                ),
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {`${errors.email?.message}`}
                    </FormErrorMessage>
                </FormControl>

                {loginLink ?? (
                    <Box mb="3" display="flex" justifyContent="flex-end">
                        <span>
                            {translate(
                                "pages.register.buttons.haveAccount",
                                "Have an account?",
                            )}
                        </span>
                        <ChakraLink
                            color="primary.500"
                            ml="1"
                            as={Link}
                            to="/login"
                        >
                            {translate("pages.login.signin", "Sign in")}
                        </ChakraLink>
                    </Box>
                )}

                <Button mb="3" type="submit" width="full" colorScheme="primary">
                    {translate(
                        "pages.forgotPassword.buttons.submit",
                        "Send reset instructions",
                    )}
                </Button>
            </form>
        </Box>
    );

    return (
        <Box style={layoutStyles} {...wrapperProps}>
            {renderContent ? renderContent(content) : content}
        </Box>
    );
};
