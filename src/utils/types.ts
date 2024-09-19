export interface TaskType {
    id: string
    status: string
    sort: number
    user_created: string
    date_created: string
    end_date: any
    description: string
    heading: string
    date_updated: any
    sub_task: SubTaskType[]
}
export interface SubTaskType {
    id: string
    status: string
    sort: number
    date_created: string
    heading: string
    date_updated: any
    task: string
}