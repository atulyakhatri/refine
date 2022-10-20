import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineButtonTestIds,
    RefineShowButtonProps,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconEye, TablerIconProps } from "@tabler/icons";

export type ShowButtonProps = RefineShowButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

/**
 * `<ShowButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when red sirecting the app to the show page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/show-button} for more details.
 */
export const ShowButton: React.FC<ShowButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, id, resource } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const { showUrl: generateShowUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "show",
        params: { id, resource },
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    const disabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const showUrl = generateShowUrl(resource.route!, id!);

    return (
        <Link
            to={showUrl}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            {hideText ? (
                <IconButton
                    variant="outline"
                    aria-label={translate("buttons.show", "Show")}
                    disabled={data?.can === false}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ShowButton}
                    {...rest}
                >
                    <IconEye size={18} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    size="sm"
                    disabled={data?.can === false}
                    leftIcon={<IconEye size={18} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ShowButton}
                    {...rest}
                >
                    {children ?? translate("buttons.show", "Show")}
                </Button>
            )}
        </Link>
    );
};
