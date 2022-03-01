declare let product: string[];
export interface OkraBuildWithOptionsProps {
    name: string;
    env: string;
    app_id?: string;
    okraKey: string;
    token: string;
    products: typeof product;
    exp?: Date;
    currency?: string;
    callback_url?: string;
    widget_failed?: string;
    widget_success?: string;
    connectMessage?: string;
    isCorporate?: boolean;
    filter?: any[];
    limit?: number;
    color?: string;
    logo?: string;
    charge?: string[];
    payment?: boolean;
    onSuccess: (e: any) => void;
    onClose: (e: any) => void;
    BeforeClose?: () => void;
    onError?: (e: any) => void;
}
export interface OkraBuildWithShortUrlProps {
    short_url: string;
    onSuccess: (e: any) => void;
    onClose: (e: any) => void;
    BeforeClose?: () => void;
    onError?: (e: any) => void;
}
export interface ShortUrlWebViewConfigProps {
    short_url: string;
}
export interface OptionWebViewConfigProps {
    name: string;
    env: string;
    app_id?: string;
    okraKey: string;
    token: string;
    products: typeof product;
    exp?: Date;
    currency?: string;
    callback_url?: string;
    widget_failed?: string;
    widget_success?: string;
    connectMessage?: string;
    isCorporate?: boolean;
    filter?: any[];
    limit?: number;
    color?: string;
    logo?: string;
    charge?: chargeProps;
    payment?: boolean;
}
interface chargeProps {
    type: type;
    amount: number | null;
    note?: string;
    currency?: string;
    account: string;
}
declare type type = 'one-time' | 'recurring';
export {};
