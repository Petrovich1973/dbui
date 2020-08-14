import axios, {AxiosResponse} from 'axios'

export type ResourceType =
    | "Unknown" // неизвестный
    | "Any" // любой
    | "Topic" // топик
    | "Group" // группа читателей
    | "Cluster" // кластер
    | "TransactionalId" // идентификаторы транзакций(для exactly-one записи)
    | "DelegationToken" // токен делегирования


export interface Resource {
    resourceType: ResourceType
    name: string
}

export type AclOperation =
  | "Unknown" // неизвестный
  | "Any" // любая - при фильтрации возможных операций соответствует любой операции из списка ниже
  | "All" // все операции
  | "Read" // чтение
  | "Write" // запись
  | "Create" // создание
  | "Delete" // удаление
  | "Alter" // изменение
  | "Describe" // возможность получения описания ресурса
  | "ClusterAction" // действия с кластером
  | "DescribeConfigs" // получение значений динамической конфигурации
  | "AlterConfigs" // изменение значений динамической конфигурации
  | "IdempotentWrite" // возможность выполнения exactly-one записи

export type PermissionType =
  | "Unknown" // неизвестный
  | "Any" // любой
  | "Deny" // запрет
  | "Allow" // разрешение

export interface Acl {
    principal: string,  // имя пользователя, который может обращаться к данному ресурсу
    host: string,  // имя хоста, с которого возможно обращение к ресурсу
    operation: AclOperation,  // операция, которая разрешена в отношении данного ресурса
    permissionType: PermissionType   // тип доступа к ресурсу
}

export interface ResourceAcls {
    resource: Resource
    acls: Acl[]
}

// /api/clusters/:id/acls
export async function getClusterIdAcls(host: string, clusterId: number): Promise<AxiosResponse<ResourceAcls[]>> {
    const url = `${host}/clusters/${clusterId}/acls`
    return axios.get<ResourceAcls[]>(url)
}